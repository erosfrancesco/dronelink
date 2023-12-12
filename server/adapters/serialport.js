import { SerialPort } from "serialport";
import { messageCommand } from "./utils.js";

const ConnectedPorts = {}; // PORT ALREADY CONNECTED

export const openSerialConnection = (path = "COM6", baudRate = 9600) => {
  if (ConnectedPorts[path]) {
    return ConnectedPorts[path];
  }

  ConnectedPorts[path] = new SerialPort(
    {
      path,
      baudRate,
    },
    false
  );

  return ConnectedPorts[path];
};

// WS ADAPTER
export const connectToSerialCommandType = "connect_to_serial";

export const connectToSerialCommand = ({ port, baudRate }) => {
  const res = JSON.stringify({
    type: connectToSerialCommandType,
    port,
    baudRate,
  });

  return res;
};

// Don't use this. Only for test purposes
export const handleSerialPortConnect = (ws, { type, ...args }) => {
  if (type !== connectToSerialCommandType) {
    return;
  }

  const { port: path, baudRate } = args;

  if (ConnectedPorts[path]) {
    ws.send(messageCommand({ message: "Port connected" }));
    return;
  }

  const port = openSerialConnection(path, baudRate);

  port.on("error", (e) => {
    ws.send(messageCommand({ error: e.message }));
  });

  port.on("open", () => {
    // create connection message
    ws.send(messageCommand({ message: "Port connected" }));
  });
};

export default openSerialConnection;
