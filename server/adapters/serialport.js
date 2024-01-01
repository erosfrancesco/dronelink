import { SerialPort } from "serialport";

const ConnectedPorts = {}; // PORTS ALREADY CONNECTED

export const openSerialConnection = (path = "COM6", baudRate = 9600) => {
  if (ConnectedPorts[path]) {
    return ConnectedPorts[path];
  }

  ConnectedPorts[path] = new SerialPort({
    path,
    baudRate,
  });

  return ConnectedPorts[path];
};

export const closeSerialConnection = (path) => {
  ConnectedPorts[path].close();
  delete ConnectedPorts[path];
};

export const listSerialConnections = () => {
  return SerialPort.list().then((ports) => {
    // console.log("Port: ", ports);
    return ports;
  });
};

export default {
  openSerialConnection,
  closeSerialConnection,
  listSerialConnections,
};
