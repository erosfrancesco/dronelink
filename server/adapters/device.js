import { setupMavlinkReader } from "./mavlink.js";

import {
  openSerialConnection,
  closeSerialConnection,
  listSerialConnections,
} from "./serialport.js";

import {
  messageCommand,
  openDeviceConnectionCommandType,
  closeDeviceConnectionCommandType,
  sendPortListCommandType,
  sendPortListCommand,
  MessageDeviceConnected,
} from "../../messages.js";

const openDevice = async (ws, args = {}) => {
  const { port, baudRate } = args;

  try {
    const serial = await openSerialConnection(port, baudRate);
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

    ws.send(messageCommand({ message: MessageDeviceConnected }));
  } catch (error) {
    ws.send(messageCommand({ error }));
  }
};

export const handleDeviceConnection = async (ws, { type, ...args }) => {
  if (type === sendPortListCommandType) {
    const ports = await listSerialConnections();
    ws.send(sendPortListCommand({ ports }));

    return;
  }

  if (type === openDeviceConnectionCommandType) {
    await openDevice(ws, args);
    return;
  }

  if (type === closeDeviceConnectionCommandType) {
    const { port } = args;
    closeSerialConnection(port);
    return;
  }

  return;
};
