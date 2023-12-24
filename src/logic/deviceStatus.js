import van from "vanjs-core";
import {
  DEVICE_CONNECTED,
  event,
  wsOpenDeviceConnection,
  wsCloseDeviceConnection,
  wsSend,
} from "../client.js";

import { sendMavlinkPacketCommand } from "../../messages.js";
import { setCommandList } from "./commands.js";

// STATE
export const isConnected = van.state(false);
export const setIsConnected = (value) => (isConnected.val = value);
export const devicePath = van.state("COM6");
export const setDevicePath = (value) => (devicePath.val = value);
//

// EVENTS
event.on(DEVICE_CONNECTED, (e) => {
  setIsConnected(true);
  setCommandList(e);
  console.log(e);

  /**
  // SEND PACKET
  console.log("Requesting status");
  wsSend(
    sendMavlinkPacketCommand({
      command: "RequestMessageCommand",
      messageId: 1,
    })
  );
  /** */
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
