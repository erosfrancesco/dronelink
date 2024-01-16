import { sendMavlinkCommandPacket } from "./protocols/commands.js";
import { requestParamRead, requestParamWrite } from "./protocols/parameters.js";
import { getCommandList } from "../parsers/index.js";

import {
  messageCommand,
  messageCommandType,
  sendMavlinkPacketCommandType,
  sendCommandListCommandType,
  sendCommandListCommand,
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
