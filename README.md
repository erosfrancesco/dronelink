# QuadLink (Work in progress)

MAVLINK packet communication with some basic UI

## Frontend

[Vite](https://vitejs.dev). Lightweight UI Framework.
Choose this over React because the latter became a pain to set up, and generally too bloated.
The VanJs state is crude, but does its job. Also, had to set up basic UI components.
Websocket is used to comunicate with backend that provides packet events and device connection status.
Crude widgets with basic animations and a bit of graphics. For now, catching, managing and displaying data from the Backend is the priority. Maybe later a cool dashboard.

App has two sections plus one for development and testing.

### Home

    Home is where device status and connection commands are shown.

### Commands

    In this section Mavlink commands can be sent to the device, the result will be displayed here as well.

## Backend (server)

This is where nodejs:

- handles device serial comunication (package: [serialport](https://www.npmjs.com/package/serialport))
- parse mavlink packages (package: [node-mavlink](https://www.npmjs.com/package/node-mavlink))
- provides a Websocket server  (package: [ws](https://www.npmjs.com/package/ws)) that:
  - emit events with packet data
  - receive and send commands from and to the UI. (Commands, for now, are only used to open a device connection. No other particular needs. Device comunication is done via Mavlink protocol)