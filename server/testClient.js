/*
import {
  handleChat,
  handleMavlinkPackage,
  handleMavlinkRegistry,
} from "./messages/index.js";
import { deviceConnected } from "./messages/actions.js";
/** */

import WebSocket from "ws";
import { connectToSerialCommand } from "./adapters/serialport.js";
import { handleMessage } from "./adapters/WSActions.js";
const ws = new WebSocket("ws://localhost:" + (process.env.PORT || 5000));

ws.on("error", console.error);

ws.on("open", () => {
  console.log("Connection to server extabilished");
  // console.log("Trying to connect to port");

  ws.send(connectToSerialCommand({ port: "COM6" }));
  // ws.send(JSON.stringify({ type: deviceConnected, port: "COM6" }));

  // TODO: -
  // request list of commands and set test packet
});

ws.on("message", (buffer) => {
  try {
    const data = JSON.parse(buffer);
    const { type } = data;
    /*
    handleChat(ws, data);
    handleMavlinkPackage(ws, data);
    handleMavlinkRegistry(ws, data);
    /** */
    handleMessage(ws, data);
  } catch (e) {
    console.log("Error parsing message: ", e);
    // throw e;
  }
});
