import WebSocket from "ws";

import { handleMessage } from "./adapters/WSActions.js";
import { openDeviceConnectionCommand } from "./adapters/index.js";
import { handleMavlinkPacketRead } from "./adapters/mavlink.js";
const ws = new WebSocket("ws://localhost:" + (process.env.PORT || 5000));

ws.on("error", console.error);

ws.on("open", () => {
  console.log("Connection to server extabilished");
  ws.send(openDeviceConnectionCommand({ port: "COM6" }));
  // TODO:
  // 1. request list of commands
  // 2. send test packet
});

ws.on("message", (buffer) => {
  try {
    const data = JSON.parse(buffer);
    handleMessage(ws, data);
    handleMavlinkPacketRead(ws, data);
  } catch (e) {
    console.log("Error parsing message: ", e);
  }
});
