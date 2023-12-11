import { messageCommand } from "./WSActions.js";
import { setupMavlinkReader, parseMavlinkPacketCommand } from "./mavlink.js";
import openSerialConnection from "./serialport.js";

const handleParsedPackets =
  (ws) =>
  (...args) => {
    ws.send(parseMavlinkPacketCommand(...args));
  };

// WS ADAPTER
export const openDeviceConnectionCommandType = "open_connection_to_device";

export const openDeviceConnectionCommand = (args) => {
  const { port, baudRate } = args || {};

  return JSON.stringify({
    type: openDeviceConnectionCommandType,
    port,
    baudRate,
  });
};

export const handleOpenDeviceConnectionCommand = (ws, { type, ...args }) => {
  if (type !== openDeviceConnectionCommandType) {
    return;
  }

  const { port, baudRate } = args;

  const serial = openSerialConnection(port, baudRate);
  const reader = setupMavlinkReader(serial, handleParsedPackets(ws));

  serial.on("error", (e) => {
    console.log("Error: ", e);
    ws.send(messageCommand({ error: e.message }));
  });

  ws.send(messageCommand({ message: "Device connected" }));
};

export default handleOpenDeviceConnectionCommand;
