# Database Entry Example

-   **Measurement**: `qparams`
-   **Fields**:
    -   `value`: `27.5`
-   **Tags**: (to be implemented later)
    -   `location`: `kitchen`
-   **Timestamp**: Auto-generated (current time)

# Install Grafana on Ubuntu 24.04 LTS

Update system

```bash
sudo apt update
sudo apt upgrade -y
```

Getting packages on Ubuntu distributions. Add the Grafana repository to your Ubuntu installation

```bash
sudo apt-get install -y apt-transport-https
sudo apt-get install -y software-properties-common wget
sudo wget -q -O /usr/share/keyrings/grafana.key https://apt.grafana.com/gpg.key
echo "deb [signed-by=/usr/share/keyrings/grafana.key] https://apt.grafana.com stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
```

Install Grafana as a service

```bash
sudo apt-get update
sudo apt-get -y install grafana
grafana-server -v
```

Running and enable start on boot

```bash
sudo systemctl start grafana-server
sudo systemctl enable grafana-server
sudo systemctl status grafana-server
```

Access to Grafana Interface by making a SSH Tunnel and forwarding localhost:3000 from server to local machine.
Modify ~/.ssh/config

Adding 1 line to diotp-vm-influx:
`LocalForward 3000 localhost:3000`

Now the Grafana can be accessed by the browser of local machine, through `http://localhost:3000`

# Connecting InfluxDB to Grafana

1. Click on the gear icon (⚙️) in the left sidebar, then choose _Data Sources_.
2. Click Add data source, and choose InfluxDB from the list.
3. In the URL field, enter http://localhost:8086.
4. In Setting:

-   Name: "influxdb-cloud-api"
-   Query language: Flux

5. Adding token

## Create 2 Dashboard

### 1. A Gauge to show the Current Temperature

### 2. A Line grapth to visualize the Temperature in the last 3 days (or any desired time)

# Embeding the Grafana to UI using iFrame

### 1. Modify the file grafana.ini

Finding and change the line to:

```ml
allow_embedding = true
```

Also find and change:

```ml
[auth.anonymous]
# enable anonymous access
enabled = false
```

_Note: After make the change, remove the semicolon `;` at the beginning of the configuration line._

Then restart Grafana
`sudo systemctl restart grafana-server`

### 2. Embedded the dashboard to index.html

Choose Share from menu icom (... on right upside), choose Embed tab and Copy the yourlink in <iframe src="yourlink" width="450" height="200" frameborder="0"></iframe>

Paste yourlink to src iframe in index.html
