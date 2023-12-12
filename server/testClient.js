import WebSocket from "ws";
import { openDeviceConnectionCommand } from "./adapters/index.js";
import { sendMavlinkPacketCommand } from "./adapters/mavlink.js";
import { messageCommandType } from "./adapters/utils.js";
const ws = new WebSocket("ws://localhost:" + (process.env.PORT || 5000));

ws.on("error", console.error);

ws.on("open", () => {
  console.log("Connection to server extabilished");
  ws.send(openDeviceConnectionCommand({ port: "COM6" }));
});

ws.on("message", (buffer) => {
  try {
    const data = JSON.parse(buffer);
    const { type, ...args } = data;

    if (type !== messageCommandType) {
      return;
    }

    const { error, message, packetType, data: packetData } = args;

    if (message === "Device connected") {
      console.log("Sending message");
      ws.send(sendMavlinkPacketCommand({}));
    }

    if (message) {
      console.log("Got server message: ", message);
      if (packetType) {
        console.log("Got mavlink packet: ", packetType, packetData);
      }
      return;
    }

    if (error) {
      console.log("Got server error:", error);
    }

    // handle messages
  } catch (e) {
    console.log("Error parsing message: ", e);
  }
});
