import { WebSocketServer } from "ws";
import {
  handleMessage,
  handleSendPacketClasses,
  handleMavlinkCommands,
  handleMavlinkParameters,
  handleDeviceConnection,
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
      handleMessage(ws, data);
      handleSendPacketClasses(ws, data);
      await handleDeviceConnection(ws, data);
      await handleMavlinkParameters(ws, data);
      await handleMavlinkCommands(ws, data);
    } catch (error) {
      console.log("Error parsing message: ", buffer, error);
      ws.send(messageCommand({ error }));
    }
  });
});

console.log("Server listening to localhost:", port);

export * from "./adapters/index.js";
