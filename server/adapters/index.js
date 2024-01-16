import { setupMavlinkReader, MavlinkPacketClassNames } from "./mavlink.js";
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
export const handleRequestCommandListCommand = (ws, { type, ...args }) => {
  if (type !== sendCommandListCommandType) {
    return;
  }

  ws.send(sendCommandListCommand(getCommandList()));
};

export const handleMavlinkPacketSend = async (ws, { type, ...args }) => {
  if (type !== sendMavlinkPacketCommandType) {
    return;
  }

  const { command, ...otherArgs } = args;
  const port = ws.deviceConnected; //
  await sendMavlinkCommandPacket(port, command, otherArgs);
};
//

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

export default {
  handleMavlinkPacketSend,
  handleRequestCommandListCommand,
  handleMavlinkParameters,
  handleMessage,
};
