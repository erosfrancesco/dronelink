import van from "vanjs-core";
import {
  DEVICE_CONNECTED,
  event,
  wsOpenDeviceConnection,
  wsCloseDeviceConnection,
} from "../client.js";

// STATE
export const isConnected = van.state(false);
export const setIsConnected = (value) => (isConnected.val = value);
export const devicePath = van.state("COM4");
export const setDevicePath = (value) => (devicePath.val = value);
//

// EVENTS
event.on(DEVICE_CONNECTED, () => {
  setIsConnected(true);
  // request command list?
});

// ACTIONS
export const openDevicePath = () => {
  wsOpenDeviceConnection(devicePath.val);
};

export const disconnectDevicePath = () => {
  setIsConnected(false);
  wsCloseDeviceConnection(devicePath.val);
};
//
