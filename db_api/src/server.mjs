console.log("Server starting...");
// 1. Initialize
import express from "express";
import { InfluxDB, Point } from "@influxdata/influxdb-client";
import { getEnvs } from "./envs.mjs";
const ENV = getEnvs();
const app = express();
console.log(ENV.INFLUX.HOST);
// 1.2 Initialize DB connection
const DB_CLIENT = new InfluxDB({
    url: ENV.INFLUX.HOST,
    token: ENV.INFLUX.TOKEN,
});
const DB_WRITE_POINT = DB_CLIENT.getWriteApi(ENV.INFLUX.ORG, ENV.INFLUX.BUCKET);
DB_WRITE_POINT.useDefaultTags({ app: "db_api" });
const QUERY_API = DB_CLIENT.getQueryApi(ENV.INFLUX.ORG);
// Endpoint - embed
app.get("/api/v1/", (_, res) => res.sendStatus(200));

// Endpoint - Write data to InfluxDB
app.get("/api/v1/embed", async (req, res) => {
    try {
        const value = req.query.value;
        const numeric_value = parseFloat(value);
        const point = new Point("qparams");
        point.floatField("value", numeric_value);
        DB_WRITE_POINT.writePoint(point); // starts transaction
        await DB_WRITE_POINT.flush(); // end the transaction => save
        res.send(`Value: '${value}' written.`);
    } catch (err) {
        console.error(err);
        // console.log({ db: ENV.INFLUX.HOST });
        res.sendStatus(500);
    }
});
// Enpoints - base
app.get("", (_, res) => res.send("OK"));
// Enpoints - test query params
app.get("/test", (req, res) => {
    console.log(req.query);
    res.send("received queryparams!");
});

// Enpoints - Data retrieval  data point from InfluxDB
app.get("/api/v1/temp", async (req, res) => {
    const query = `
        from(bucket: "db_api")
        |> range(start: 0)
        |> filter(fn: (r) => r._measurement == "qparams")
        |> filter(fn: (r) => r._field == "value")
        |> keep(columns: ["_time", "_value"])
    `;

    try {
        const data = [];
        const rows = await QUERY_API.collectRows(query);
        rows.forEach((row) => {
            data.push({ timestamp: row._time, value: row._value });
        });
        res.json(data);
    } catch (err) {
        console.error("Error querying InfluxDB:", err);
        res.status(500).send("Error fetching data from InfluxDB");
    }
});
// 2. Operate
app.listen(ENV.PORT, ENV.HOST, () => {
    console.log(`Listening http://${ENV.HOST}:${ENV.PORT}`);
    // 3. Cleanup
    // http_server.close();
});
