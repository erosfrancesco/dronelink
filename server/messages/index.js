// TO BE REMOVED

import openMavlinkConnection from "../adapters/index.js";
import {
  deviceConnected,
  chat,
  mavlinkPacketReceived,
  mavlinkRegistry,
  serverError,
} from "./actions.js";

//
// UTILS
//
export const defaultErrorHandler = (action) => (e) => {
  console.log("Error executing: ", action);
  console.log(e);
  throw e;
};

export const handleChat = (ws, { type, ...args }) => {
  if (type !== chat) {
    return;
  }

  try {
    const { message } = args;
    console.log("Received message: ", message);
  } catch {
    defaultErrorHandler(type);
  }
};

//
// SERIALPORT
//
export const handleConnect = (ws, { type, ...args }) => {
  if (type !== deviceConnected) {
    return;
  }

  try {
    const { port: path, baudRate } = args;
    const port = openMavlinkConnection(ws)(path, baudRate);
  } catch {
    defaultErrorHandler(type);
  }
};

//
// MAVLINK
//
export const handleMavlinkPackage = (ws, { type, ...args }) => {
  if (type !== mavlinkPacketReceived) {
    return;
  }

  try {
    const { packetType, data } = args;
    console.log("Received MAVLINK message: ", packetType, data);
  } catch {
    defaultErrorHandler(type);
  }
};

export const handleMavlinkRegistry = (ws, { type, ...args }) => {
  if (type !== mavlinkRegistry) {
    return;
  }

  // JUST A CONSOLE LOG FOR NOW ---------------------------------------------------------------------------
  console.log(args.data);
};

export const handleServerError = (ws, { type, ...args }) => {
  if (type !== serverError) {
    return;
  }

  const { error } = args;
  console.log('Got error from server:', error)
  // console.error(error);
}

export default {
  handleConnect,
  handleChat,
  handleMavlinkPackage,
  handleMavlinkRegistry,
  handleServerError
};
