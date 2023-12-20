import van from "vanjs-core";
import {
  MAVLINK_PACKET_RECEIVED,
  DEVICE_CONNECTED,
  event,
  wsOpenDeviceConnection,
  wsCloseDeviceConnection,
} from "../../client.js";

// import { sendMavlinkPacketCommand } from "../../../messages.js";

// STATE
export const isConnected = van.state(false);
export const setIsConnected = (value) => (isConnected.val = value);
export const devicePath = van.state("COM6");
export const setDevicePath = (value) => (devicePath.val = value);
export const lastHeartBeat = van.state({});
export const setLastHeartBeat = (value) => (lastHeartBeat.val = value);
//

// EVENTS
event.on(DEVICE_CONNECTED, () => {
  setIsConnected(true);

  /*
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

event.on(MAVLINK_PACKET_RECEIVED, ({ packetType, packetData }) => {
  // mavlink packet event. Here the logic should manage the data

  if (packetType === "HEARTBEAT") {
    const timestamp = new Date().toLocaleString();

    setLastHeartBeat({
      timestamp,
      ...packetData,
    });

    return;
  }

  console.log("Got mavlink packet: ", packetType, packetData);
});
//

// ACTIONS
export const openDevicePath = () => {
  wsOpenDeviceConnection(devicePath.val);
};

export const disconnectDevicePath = () => {
  setIsConnected(false);
  wsCloseDeviceConnection(devicePath.val);
};
//
