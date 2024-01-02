import { WebSocketServer } from "ws";
import {
  handleMavlinkPacketSend,
  handleOpenDeviceConnectionCommand,
  handleCloseDeviceConnectionCommand,
  handleRequestCommandListCommand,
  handleMessage,
  handleRequestPortListCommand,
} from "./adapters/index.js";

import { messageCommand } from "../messages.js";

const port = process.env.PORT || 5000;
const wss = new WebSocketServer({ port });

wss.on("connection", (ws) => {
  ws.on("error", (e) => {
    console.error(e);
    ws.send(messageCommand({ error: e }));
  });

  ws.on("message", async (buffer) => {
    try {
      const data = JSON.parse(buffer);
      await handleOpenDeviceConnectionCommand(ws, data);
      handleCloseDeviceConnectionCommand(ws, data);
      handleMessage(ws, data);
      handleMavlinkPacketSend(ws, data);
      handleRequestCommandListCommand(ws, data);
      handleRequestPortListCommand(ws, data);
    } catch (error) {
      console.log("Error parsing message: ", buffer, error);
      ws.send(messageCommand({ error }));
    }
  });
});

console.log("Server listening to localhost:", port);

export * from "./adapters/index.js";
