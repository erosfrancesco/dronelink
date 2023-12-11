import { handleMessage, messageCommand } from "./adapters/WSActions.js";
import handleOpenDeviceConnectionCommand from "./adapters/index.js";
import { WebSocketServer } from "ws";

const port = process.env.PORT || 5000;
const wss = new WebSocketServer({ port });

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("message", (buffer) => {
    try {
      const data = JSON.parse(buffer);
      handleOpenDeviceConnectionCommand(ws, data);
      handleMessage(ws, data);
    } catch (error) {
      console.log("Error parsing message: ", buffer);
      console.log(error);
      ws.send(messageCommand({ error }));
    }
  });
});

console.log("Server listening to localhost:", port);
