# 1. Edge Device: Raspberry Pi Pico W + NTC Temperature Sensor

This is a sample implementation using Wokwi to simulate the edge devices. The official Edge is developed under the directory **Edge**. The technologies used are the same as used in **Edge**.

The **NTC Temperature Sensor** is a Wokwi Analog temperature sensor which has a negative temperature coefficient (NTC).

The **Raspberry Pi Pico W** is connected to a Wi-Fi network and sends HTTP requests to the cloud using the `urequests` module in MicroPython.

Purpose of this sample is to demonstrate how data can be collected from edge to the cloud.

# Project codebase

Code files:

-   `main.py` - Main program file
-   `diagram.json` - Wiring schematic to the MCU (Wokwi)
-   `readme.md` - Description of this sample

## Main program file

Responsible for all MCU operations.

Program explained from top to bottom

1. Importing necessary libraries for the program
    1. `time` - for IDLE
    2. `machine` - for hardware access (GPIOs)
    3. `network` - Establish WiFi connection
    4. `urequests` - Send data to REST API using HTTP requests
2. Initial values
    1. Interval for the routine. Repeats same task over and over
    2. Wifi credentials to access wireless network
    3. BaseURL defines path to the REST API
    4. Debug functionality for observing purposes
    5. Wiring to access connected hardware
3. Functions
    1. `read_temperature` - Convert raw unsigned 16-bit value to voltage scale 0 - Max voltage.
    2. `dlog` - Debug log. Similar to print, but the behaviour can be changed later.
    3. `sendData` - Constructs and sends GET request containing data in query parameters
    4. `connectWifi` - Sets Wifi Module to connect AP. Shows process and returns WLAN object
    5. `main` - Completes rest of the initialization and starts routine (main-loop)

## Wiring schematic

`diagram.json` is Wokwi specific file, which describes embedded system components and their connections.

This example contains only two components:

1. MCU - Rasbperry Pi Pico W (Wireless)
2. Analog input device - Potentiometer

Potentiometer is used to measure voltage flowing through the component. While measuring, processing and sending the potentiometer data, the Pico's internal LED is turned on to indicate activity. The diagram.json doesn't reveal connections to the internal LED, because it only shows wirings to the external devices.

# Communication to the cloud

This embedded solutions communicates to the `cloud` part of this monorepository. See more details on setting up the cloud part from there.

The specification of this project being able to communicate to the cloud part relies on following aspects:

Scheme:

1. GET Method
    1. Simplest possible request type to test and carry small data.
2. BASE_URL
    - protocol: http (https might work, but can be difficult to maintain CAs on the embedded device)
    - address: FQDN(Fully Qualified Domain Name) or IP(Internet Protocol) Address
    - port: 80 unless specified otherwise in the BASE_URL
    - path: `/api/v1` to the cloud API service
    - example: `http://ip.addr.to.vm/api/v1`
3. Data endpoint `/embed`
    - URL path after BASE_URL. Defines endpoint which accepts queryparameters and processes them as data. Particularly `value` parameter.
4. Query parameters
    1. Data represented in URL-safe key-value pairs. `/value` is implemented in the cloud side.

Modifying embedded system side or cloud api may break the compatibility. While modifying files, consider both sides and ensure that the systems can work together.
