# Dronelink (Work in progress)

MAVLINK packet communication with some basic UI

## Frontend

[Vite](https://vitejs.dev//). Lightweight UI Framework.
Choose this over React because the latter became a pain the behind to set up, and has become too bloated.
Need a nodejs process to read from serial. Websocket is provided in order to comunicate with that process

## Backend (server)

This is where nodejs:
    - handles device serial comunication (package: [serialport](https://www.npmjs.com/package/serialport))
    - parse mavlink packages (package: [node-mavlink](https://www.npmjs.com/package/node-mavlink))
    - provides a Websocket server for the UI, so it can manage mavlink packages (package: [ws](https://www.npmjs.com/package/ws))
