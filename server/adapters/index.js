import { sendMavlinkCommandPacket } from "./protocols/commands.js";
import { requestParamRead, requestParamWrite } from "./protocols/parameters.js";
import { MavlinkPacketClassNames } from "./protocols/messages.js";
import { getCommandList } from "../parsers/index.js";

import {
  messageCommand,
  messageCommandType,
  sendPacketClassesType,
  sendPacketClassesMessage,

  // commands
  sendMavlinkPacketCommandType,
  sendCommandListCommandType,
  sendCommandListCommand,

  // parameters
  sendParameterWriteCommandType,
  sendParameterReadCommandType,
} from "../../messages.js";

// WS ADAPTERS
export const handleMessage = (ws, { type, ...args }) => {
  if (type !== messageCommandType) {
    return;
  }

  const { error, message } = args;
  ws.send(messageCommand({ error, message }));
};

export const handleSendPacketClasses = (ws, { type, ...args }) => {
  if (type !== sendPacketClassesType) {
    return;
  }

  ws.send(sendPacketClassesMessage(MavlinkPacketClassNames));
};

// commands
export const handleMavlinkCommands = async (ws, { type, ...args }) => {
  if (type === sendCommandListCommandType) {
    ws.send(sendCommandListCommand(getCommandList()));
    return;
  }

  if (type === sendMavlinkPacketCommandType) {
    const { command, ...otherArgs } = args;
    const port = ws.deviceConnected; //
    await sendMavlinkCommandPacket(port, command, otherArgs);
    return;
  }
  return;
};

// parameters
export const handleMavlinkParameters = async (ws, { type, ...args }) => {
  if (type === sendParameterWriteCommandType) {
    const { ...otherArgs } = args;
    const port = ws.deviceConnected; //
    await requestParamWrite(port, otherArgs);

    return;
  }

  if (type === sendParameterReadCommandType) {
    const { ...otherArgs } = args;
    const port = ws.deviceConnected; //
    await requestParamRead(port, otherArgs);

    return;
  }

  return;
};

export * from "./device.js";
