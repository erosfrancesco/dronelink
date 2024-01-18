import { ws } from "./ws.js";
import {
  // device
  openDeviceConnectionCommand,
  closeDeviceConnectionCommand,

  // params
  sendParameterReadCommand,
  sendParameterWriteCommand,
} from "../../messages.js";

// COMMANDS
export const wsSend = (args) => ws.send(args);

// Parameters
export const wsParameterRead = (args) =>
  ws.send(sendParameterReadCommand({ ...args }));

export const wsParameterWrite = (args) =>
  ws.send(sendParameterWriteCommand({ ...args }));

// Device
export const wsOpenDeviceConnection = (port) =>
  ws.send(openDeviceConnectionCommand({ port }));

export const wsCloseDeviceConnection = (port) =>
  ws.send(closeDeviceConnectionCommand({ port }));
//
