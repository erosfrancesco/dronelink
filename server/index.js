import {
  handleChat,
  handleConnect,
  handleMavlinkPackage,
} from "./messages/index.js";

import { WebSocketServer } from "ws";
const port = process.env.PORT || 5000;
const wss = new WebSocketServer({ port });

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("message", (buffer) => {
    try {
      const data = JSON.parse(buffer);
      const { type, ...args } = data;

      handleConnect(ws, data);
      handleChat(ws, data);
      handleMavlinkPackage(ws, data);
    } catch (e) {
      console.log("Error parsing message: ", buffer);
      console.error(e);
    }
  });
});

console.log("Server listening to localhost:", port);
