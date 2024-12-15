Try to query the data from InfluxDB by CLI of the Server

## Querying Data from InfluxDB using the CLI on Ubuntu

The InfluxDB CLI (`influx`) is used to interact with your InfluxDB instance. Ensure it's installed and accessible.

#### Install the CLI
If not installed, use:
```bash
sudo apt-get install influxdb2-cli
```
#### Authenticate with Your InfluxDB Instance

```bash
influx config create \
  --config-name my-config \
  --host-url http://localhost:8086 \
  --org YOUR_ORG_NAME \
  --token YOUR_AUTH_TOKEN \
  --active
```
#### Test your configuration:
 `influx ping`

If it response 'OK' then thing are going right.

#### Query the Data:

```bash
influx query 'from(bucket:"http-api-data") 
  |> range(start: 0) 
  |> filter(fn: (r) => r._measurement == "qparams") 
  |> filter(fn: (r) => r._field == "value")'
```

Result: _result
Table: keys: []
_time:time                      | _value:float
------------------------------  |----------------------------|
2024-11-15T20:46:16.632700534Z  |                          26
2024-11-15T20:46:47.075569268Z  |                          26
2024-11-15T20:49:16.815831257Z  |                          26
2024-11-15T20:49:46.823512544Z  |                        22.2
2024-11-15T20:49:52.364024196Z  |                        33.3
2024-11-16T16:56:18.143292601Z  |                        20.1
2024-11-16T16:56:42.058075180Z  |                          26
2024-11-16T16:57:11.125569479Z  |                          26
2024-11-16T16:57:47.964715057Z  |                        9.17

Since the data that we wrote to InfluxDB is retrivable, now adjust the server.mjs with the API endpoint ip-to-the-server/api/v1/data where we have the data from InfluxDB under JSON format.

