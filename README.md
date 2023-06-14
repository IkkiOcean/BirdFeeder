## For Node Server

Step 1:
```shell
npm install
```

Step 2:
```shell
npm start
```

## ESP32

Steps:

Change with your host and port
```c
static String HOST = "192.168.4.1"; // Your Server Address
static int PORT = 3000;
```

Change Wifi Details
```c
if (!wifiManager.autoConnect("SSID", "PASSWORD")) {
Serial.println("Failed Connection to remote Access Point");
ESP.restart();
delay(5000);
}
```# BirdFeeder
