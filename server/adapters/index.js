import { setupMavlinkReader, MavlinkPacketClassNames } from "./mavlink.js";
import { sendMavlinkCommandPacket } from "./mavlinkCommands.js";
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
  MessageDeviceConnected,
  MessagePacketNamesList,
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

export const handleOpenDeviceConnectionCommand = async (
  ws,
  { type, ...args }
) => {
  if (type !== openDeviceConnectionCommandType) {
    return;
  }

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
    ws.send(
      messageCommand({
        message: MessagePacketNamesList,
        MavlinkPacketClassNames,
      })
    );
    ws.send(sendCommandListCommand(getCommandList()));
  } catch (error) {
    ws.send(messageCommand({ error }));
  }
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
  await sendMavlinkCommandPacket(port, command, otherArgs);
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
