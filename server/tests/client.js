import WebSocket from "ws";
import {
  messageCommandType,
  sendCommandListCommandType,
  openDeviceConnectionCommand,
  // sendPortListCommand,
  sendMavlinkPacketCommand,
  MessageDeviceConnected,
  // send,
} from "../../messages.js";

const ws = new WebSocket("ws://localhost:" + (process.env.PORT || 5000));

ws.on("error", console.error);

ws.on("open", () => {
  console.log("Connection to server extabilished");
  // ws.send(sendPortListCommand());
  ws.send(openDeviceConnectionCommand({ port: "COM4" }));
});

ws.on("message", (buffer) => {
  try {
    const data = JSON.parse(buffer);
    const { type, ...args } = data;

    if (type === sendCommandListCommandType) {
      console.log("Available commands received");
      return;
    }

    if (type !== messageCommandType) {
      return;
    }

    const { error, message, packetType, packetData, ...otherArgs } = args;

    if (message === MessageDeviceConnected) {
      console.log("Device connected. Sending message");
      ws.send(
        JSON.stringify({
          type: "MavlinkParameters",
          paramId: "ATC_ANG_YAW_P",
        })
      );
      // yes!
      /** 
      ws.send(
        sendMavlinkPacketCommand({
          // MAV_CMD_REQUEST_MESSAGE
          command: "REQUEST_MESSAGE",
          param1: 26,
        })
      );

      /*
      ws.send(
        sendMavlinkPacketCommand({
          command: "RUN_PREARM_CHECKS",
        })
      );
      /** */
      return;
    }

    if (message) {
      // console.log("Got server message: ", message);
      if (packetType) {
        // FILTER OUT HEARTBEAT. They are too many...
        if (packetType === "HEARTBEAT") {
          // console.log("HeartBeat: ", packetData);
          return;
        }

        console.log("Got mavlink packet: ", packetType, packetData);
      }

      console.log("Got server message:", message, otherArgs);
      return;
    }

    if (error) {
      console.log("Got server error:", error);
    }

    // handle messages
    console.log("Unrecognized packet: ", data);
  } catch (e) {
    console.log("Error parsing message: ", e);
  }
});
