import EventEmitter from "events";

import {
  messageCommandType,
  sendCommandListCommandType,
  openDeviceConnectionCommand,
  closeDeviceConnectionCommand,
  MessageDeviceConnected,
  MessagePacketNamesList,
} from "../messages.js";

const ws = new WebSocket("ws://localhost:" + 5000);

// Event manager
export const SERVER_ERROR = "ServerError";
export const SERVER_CONNECTED = "ServerConnected";
export const SERVER_MESSAGE_RECEIVED = "ServerMessageReceived";
export const SERVER_ERROR_RECEIVED = "ServerErrorReceived";
export const MAVLINK_PACKET_RECEIVED = "MavlinkPacketReceived";
export const DEVICE_CONNECTED = "DeviceConnected";
export const COMMANDLIST_RECEIVED = "CommandListReceived";
export const PACKET_CLASSES_RECEIVED = "PacketClassesReceived";
export const event = new EventEmitter();
//

const handleCommandListReceived = (args) => {
  event.emit(COMMANDLIST_RECEIVED, args);
};

// HANDLERS
const onWSOpen = () => {
  event.emit(SERVER_CONNECTED);
};

const onWSMessage = (buffer) => {
  try {
    const data = JSON.parse(buffer.data);
    const { type, ...args } = data;

    // COMMAND LIST RECEIVED
    if (type === sendCommandListCommandType) {
      handleCommandListReceived(args);
      return;
    }

    if (type !== messageCommandType) {
      return;
    }

    const { error, message, packetType, packetData, ...otherArgs } = args;

    // ERROR RECEIVED
    if (error) {
      event.emit(SERVER_ERROR_RECEIVED, error);
      return;
    }

    // DEVICE CONNECTED
    if (message === MessageDeviceConnected) {
      event.emit(DEVICE_CONNECTED);
      return;
    }

    // MAVLINK CLASSES ENUM RECEIVED
    if (message === MessagePacketNamesList) {
      const { MavlinkPacketClassNames } = otherArgs;
      event.emit(PACKET_CLASSES_RECEIVED, MavlinkPacketClassNames);
      return;
    }

    // MAVLINK PACKET RECEIVED
    if (packetType) {
      event.emit(MAVLINK_PACKET_RECEIVED, { packetType, packetData });
      return;
    }

    // MESSAGE RECEIVED
    event.emit(SERVER_MESSAGE_RECEIVED, message);
  } catch (e) {
    console.log("Error parsing message: ", e);
  }
};

const onWSError = (e) => {
  event.emit(SERVER_ERROR, "WS Connection failed");
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
