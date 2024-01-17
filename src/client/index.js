import {
  messageCommandType,
  MessageDeviceConnected,
  sendCommandListCommandType,
  requestPacketClasses,
  MessagePacketNamesList,
} from "../../messages.js";

import {
  onCommandListReceived,
  onDeviceConnected,
  onMessageErrorReceived,
  onMessageReceived,
  onPacketClassesReceived,
  onPacketReceived,
  onServerConnected,
  onServerErrorReceived,
} from "./events.js";

import { ws } from "./ws.js";

// HANDLERS
const onWSOpen = () => {
  ws.send(requestPacketClasses());

  onServerConnected();
};

const onWSMessage = (buffer) => {
  try {
    const data = JSON.parse(buffer.data);
    const { type, ...args } = data;

    // COMMAND LIST RECEIVED
    if (type === sendCommandListCommandType) {
      onCommandListReceived(args);
      return;
    }

    if (type !== messageCommandType) {
      return;
    }

    const { error, message, packetType, packetData, ...otherArgs } = args;

    // ERROR RECEIVED
    if (error) {
      onMessageErrorReceived(error);
      return;
    }

    // DEVICE CONNECTED
    if (message === MessageDeviceConnected) {
      onDeviceConnected();
      return;
    }

    // MAVLINK CLASSES ENUM RECEIVED
    if (message === MessagePacketNamesList) {
      const { packetClasses } = otherArgs;
      onPacketClassesReceived(packetClasses);
      return;
    }

    // MAVLINK PACKET RECEIVED
    if (packetType) {
      onPacketReceived({ packetType, packetData });
      return;
    }

    // MESSAGE RECEIVED
    onMessageReceived(message);
  } catch (e) {
    console.log("Error parsing message: ", e);
  }
};

const onWSError = (e) => {
  onServerErrorReceived(e);
};
//

ws.onerror = onWSError;
ws.onopen = onWSOpen;
ws.onmessage = onWSMessage;

export * from "./commands.js";
export * from "./events.js";

export default ws;
