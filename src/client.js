import EventEmitter from "events";

import {
  messageCommandType,
  openDeviceConnectionCommand,
  closeDeviceConnectionCommand,
} from "../messages.js";

const ws = new WebSocket("ws://localhost:" + 5000);

// Event manager
export const SERVER_ERROR = "ServerError";
export const SERVER_CONNECTED = "ServerConnected";
export const SERVER_MESSAGE_RECEIVED = "ServerMessageReceived";
export const SERVER_ERROR_RECEIVED = "ServerErrorReceived";
export const MAVLINK_PACKET_RECEIVED = "MavlinkPacketReceived";
export const DEVICE_CONNECTED = "DeviceConnected";
export const event = new EventEmitter();
//

// HANDLERS
const onWSOpen = () => {
  event.emit(SERVER_CONNECTED);
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
      event.emit(SERVER_ERROR_RECEIVED, error);
      return;
    }

    if (message === "Device connected") {
      event.emit(DEVICE_CONNECTED);
      return;
    }

    if (packetType) {
      event.emit(MAVLINK_PACKET_RECEIVED, { packetType, packetData });
      return;
    }

    event.emit(SERVER_MESSAGE_RECEIVED, message);
  } catch (e) {
    console.log("Error parsing message: ", e);
  }
};

const onWSError = () => {
  event.emit(SERVER_ERROR);
};

ws.onerror = onWSError;
ws.onopen = onWSOpen;
ws.onmessage = onWSMessage;

// COMMANDS
export const wsSend = (args) => ws.send(args);

export const wsOpenDeviceConnection = (port) =>
  ws.send(openDeviceConnectionCommand({ port }));

export const wsCloseDeviceConnection = (port) =>
  ws.send(closeDeviceConnectionCommand({ port }));

export default ws;
