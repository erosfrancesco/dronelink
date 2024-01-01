import { setupMavlinkReader, sendPacket } from "./mavlink.js";
import {
  openSerialConnection,
  closeSerialConnection,
  listSerialConnections,
} from "./serialport.js";
import { getCommandList } from "../parsers/index.js";

import {
  messageCommand,
  messageCommandType,
  openDeviceConnectionCommandType,
  closeDeviceConnectionCommandType,
  sendMavlinkPacketCommandType,
  sendCommandListCommandType,
  sendCommandListCommand,
  sendPortListCommandType,
  sendPortListCommand,
} from "../../messages.js";

// WS ADAPTERS
export const handleRequestCommandListCommand = (ws, { type, ...args }) => {
  if (type !== sendCommandListCommandType) {
    return;
  }

  ws.send(sendCommandListCommand(getCommandList()));
};

export const handleRequestPortListCommand = (ws, { type, ...args }) => {
  if (type !== sendPortListCommandType) {
    return;
  }

  listSerialConnections().then((ports) =>
    ws.send(sendPortListCommand({ ports }))
  );
};

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

  ws.send(messageCommand({ message: "Device connected" }));
  ws.send(sendCommandListCommand(getCommandList()));
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
  // const res =
  await sendPacket(port, command, otherArgs);

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
  handleRequestCommandListCommand,
  handleRequestPortListCommand,
  handleMessage,
};
