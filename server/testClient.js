import {
  handleChat,
  handleMavlinkPackage,
  handleMavlinkRegistry,
} from "./messages/index.js";
import { deviceConnected } from "./messages/actions.js";

import WebSocket from "ws";
const ws = new WebSocket("ws://localhost:" + (process.env.PORT || 5000));

ws.on("error", console.error);

ws.on("open", () => {
  console.log("Connection to server extabilished");
  console.log("Trying to connect to port");

  ws.send(JSON.stringify({ type: deviceConnected, port: "COM6" }));
});

ws.on("message", (buffer) => {
  try {
    const data = JSON.parse(buffer);
    const { type, ...args } = data;
    console.log("received message:", type);

    handleChat(ws, data);
    handleMavlinkPackage(ws, data);
    handleMavlinkRegistry(ws, data);
  } catch (e) {
    console.log("Error parsing message: ", e);
    // throw e;
  }
});
