import { setupMavlinkReader, sendPacket } from "./mavlink.js";
import { openSerialConnection, closeSerialConnection } from "./serialport.js";
import { getCommandList } from "../parsers/index.js";

import {
  messageCommand,
  messageCommandType,
  openDeviceConnectionCommandType,
  closeDeviceConnectionCommandType,
  sendMavlinkPacketCommandType,
  sendCommandListCommandType,
  sendCommandListCommand,
} from "../../messages.js";

const handleRequestCommandListCommand = (ws, { type, ...args }) => {
  if (type !== sendCommandListCommandType) {
    return;
  }

  const commandList = getCommandList();
  ws.send(sendCommandListCommand({ commandList }));
};

// WS ADAPTERS
export const handleOpenDeviceConnectionCommand = (ws, { type, ...args }) => {
  if (type !== openDeviceConnectionCommandType) {
    return;
  }

  const { port, baudRate } = args;

  const serial = openSerialConnection(port, baudRate);
  const reader = setupMavlinkReader(serial, (packetType, packetData) => {
    const message = "Received MAVLINK Packet: " + packetType;
    ws.send(messageCommand({ message, packetData, packetType }));
  });

  //
  ws.deviceConnected = serial;
  ws.mavlinkReader = reader;
  //

  serial.on("error", (e) => {
    ws.send(messageCommand({ error: e.message }));
  });

  const commandList = getCommandList();
  ws.send(messageCommand({ message: "Device connected", commandList }));
  ws.send(sendCommandListCommand({ commandList }));
};

export const handleCloseDeviceConnectionCommand = (ws, { type, ...args }) => {
  if (type !== closeDeviceConnectionCommandType) {
    return;
  }

  const { port } = args;
  closeSerialConnection(port);
};

export const handleMavlinkPacketSend = async (ws, { type, ...args }) => {
  if (type !== sendMavlinkPacketCommandType) {
    return;
  }

  const { command, ...otherArgs } = args;
  const port = ws.deviceConnected; //
  const res = await sendPacket(port, command, otherArgs);

  // Not required
  // ws.send(messageCommand({ message: "MAVLINK packet sent: " + res }));
};

export const handleMessage = (ws, { type, ...args }) => {
  if (type !== messageCommandType) {
    return;
  }

  const { error, message } = args;
  ws.send(messageCommand({ error, message }));
};

export default {
  handleOpenDeviceConnectionCommand,
  handleCloseDeviceConnectionCommand,
  handleMavlinkPacketSend,
  handleMessage,
};
