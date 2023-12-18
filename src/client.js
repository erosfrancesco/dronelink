import {
  messageCommandType,
  openDeviceConnectionCommand,
  closeDeviceConnectionCommand,
  sendMavlinkPacketCommand,
} from "../messages.js";

// THIS IS STILL A TEST CLIENT
const ws = new WebSocket("ws://localhost:" + 5000);

let onMavlinkPacketReceived = console.log;
export const setOnMavlinkPacketReceived = (callback = () => {}) => {
  onMavlinkPacketReceived = callback;
};

let onDeviceConnected = console.log;
export const setOnDeviceConnected = (callback = () => {}) => {
  onDeviceConnected = callback;
};

const onWSOpen = () => {
  console.log("Connection to server extabilished");
};

const onWSMessage = (buffer) => {
  try {
    const data = JSON.parse(buffer.data);
    const { type, ...args } = data;

    if (type !== messageCommandType) {
      return;
    }

    const { error, message, packetType, packetData } = args;

    if (error) {
      console.log("Got server error:", error);
      return;
    }

    if (message === "Device connected") {
      onDeviceConnected();
      return;
    }

    if (packetType) {
      onMavlinkPacketReceived(packetType, packetData);
    }
  } catch (e) {
    console.log("Error parsing message: ", e);
  }
};

ws.onerror = console.error;
ws.onopen = onWSOpen;
ws.onmessage = onWSMessage;

export const wsOpenDeviceConnection = (port) => {
  ws.send(openDeviceConnectionCommand({ port }));
};

export const wsCloseDeviceConnection = (port) => {
  ws.send(closeDeviceConnectionCommand({ port }));
};

export default ws;
