# Project Roadmap: Next Steps

## 1. Deploy the project to Production
  - **Set up environment variables**
    -  using .env to ensure security to avoid hardcoding sensitive credentials (e.g., API tokens, database URLs) in your code: 
  - **Deploy the project to Production enviroment**

## 2. Develop a Graph-based UI with Grafana and sending alert function
- **Set up Grafana Dashboard and embed to the UI**:
  - Create visualizations for sensor data (e.g., real-time graphs, historical trends).

- **Configure Alerts**:
  - Set up alert using InfluxDB for unusual temperature values.
  - Use services like Slack, email, or webhooks to receive notifications.

---

## 3. Data Validation
-  **Implement a Midleware to verify the data before sending it to Cloud**
- **Data Aggregation**:
  - Store meaningful aggregated data (e.g., hourly averages) instead of raw data if volume grows too high.

---

## 4. TESTING
  *to be detailed...*

---

## 5. Implement Authentication
- **Using some services like Hooks from Firebase to deploy an User Authenication**

---

## 6. Extend to IoT Devices
- **Add Multiple Sensors**:
  - Implement one more sensor sending data to the API.
  - Use unique identifiers for each device (DeviceID, location) in the InfluxDB data tags.

---

## Prioritization
UI Dashboard
Data validation
Tesing
Deployment

