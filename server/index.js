import { WebSocketServer } from "ws";
import { handleMavlinkPacketSend } from "./adapters/mavlink.js";
import { handleMessage, messageCommand } from "./adapters/utils.js";
import handleOpenDeviceConnectionCommand from "./adapters/index.js";

const port = process.env.PORT || 5000;
const wss = new WebSocketServer({ port });

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("message", (buffer) => {
    try {
      const data = JSON.parse(buffer);
      handleOpenDeviceConnectionCommand(ws, data);
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
