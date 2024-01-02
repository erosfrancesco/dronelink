import { SerialPort } from "serialport";

const ConnectedPorts = {}; // PORTS ALREADY CONNECTED

export const openSerialConnection = async (path = "COM6", baudRate = 9600) => {
  const availablePorts = await listSerialConnections();
  const port = availablePorts.find((port) => port.path === path);
  if (!port) {
    // throw error
    throw path + " not found";
    return;
  }

  if (ConnectedPorts[path]) {
    return ConnectedPorts[path];
  }

  ConnectedPorts[path] = new SerialPort({
    path,
    baudRate,
  });

  ConnectedPorts[path].friendlyName = port.friendlyName;

  return ConnectedPorts[path];
};

export const closeSerialConnection = (path) => {
  ConnectedPorts[path].close();
  delete ConnectedPorts[path];
};

/**
 * Port:  [
  {
    path: 'COM4',
    manufacturer: 'ArduPilot Project',
    serialNumber: '370048000350475532323620',
    pnpId: 'USB\\VID_1209&PID_5741\\370048000350475532323620',
    locationId: 'Port_#0004.Hub_#0001',
    friendlyName: 'ArduPilot (COM4)',
    vendorId: '1209',
    productId: '5741'
  }
]
 */
export const listSerialConnections = async () => await SerialPort.list();

export default {
  openSerialConnection,
  closeSerialConnection,
  listSerialConnections,
};
