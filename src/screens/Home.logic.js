import van from "vanjs-core";
import ws, {
  setOnDeviceConnected,
  setOnMavlinkPacketReceived,
  wsOpenDeviceConnection,
  wsCloseDeviceConnection,
} from "../client.js";

export const isConnected = van.state(false);
export const setIsConnected = (value) => (isConnected.val = value);
export const devicePath = van.state("COM6");
export const setDevicePath = (value) => (devicePath.val = value);
export const openDevicePath = () => {
  wsOpenDeviceConnection(devicePath.val);

  setOnDeviceConnected(() => {
    setIsConnected(true);
    setOnMavlinkPacketReceived((packetType, packetData) => {
      // mavlink packet event. Here the logic should manage the data
      console.log("Got mavlink packet: ", packetType, packetData);
    });
  });
};

export const disconnectDevicePath = () => {
  setIsConnected(false);
  wsCloseDeviceConnection(devicePath.val);
};

export default ws;
