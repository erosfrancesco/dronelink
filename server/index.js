import { WebSocketServer } from "ws";
import {
  handleMavlinkPacketSend,
  handleOpenDeviceConnectionCommand,
  handleCloseDeviceConnectionCommand,
  handleMessage,
} from "./adapters/index.js";

import { messageCommand } from "../messages.js";

const port = process.env.PORT || 5000;
const wss = new WebSocketServer({ port });

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("message", (buffer) => {
    try {
      const data = JSON.parse(buffer);
      handleOpenDeviceConnectionCommand(ws, data);
      handleCloseDeviceConnectionCommand(ws, data);
      handleMessage(ws, data);
      handleMavlinkPacketSend(ws, data);
    } catch (error) {
      console.log("Error parsing message: ", buffer);
      console.log(error);
      ws.send(messageCommand({ error }));
    }
  });
});

console.log("Server listening to localhost:", port);

export * from "./adapters/index.js";
export default wss;
