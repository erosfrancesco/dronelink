import van from "vanjs-core";
import ws, {
  setOnDeviceConnected,
  setOnMavlinkPacketReceived,
  wsOpenDeviceConnection,
  wsCloseDeviceConnection,
} from "../../client.js";

import { sendMavlinkPacketCommand } from "../../../messages.js";

// STATE
export const isConnected = van.state(false);
export const setIsConnected = (value) => (isConnected.val = value);
export const devicePath = van.state("COM6");
export const setDevicePath = (value) => (devicePath.val = value);
export const lastHeartBeat = van.state({});
export const setLastHeartBeat = (value) => (lastHeartBeat.val = value);
/*
export const deviceType = van.state("");
export const setDeviceType = (value) => (deviceType.val = value);
export const deviceSystem = van.state("");
export const setDevicePilot = (value) => (deviceSystem.val = value);
export const deviceStatus = van.state("");
export const setDeviceStatus = (value) => (deviceStatus.val = value);
/** */
//

// ACTIONS
export const openDevicePath = () => {
  wsOpenDeviceConnection(devicePath.val);

  setOnDeviceConnected(() => {
    setIsConnected(true);
    setOnMavlinkPacketReceived((packetType, packetData) => {
      // mavlink packet event. Here the logic should manage the data

      // {"autopilot":"ARDUPILOTMEGA","customMode":0,"mavlinkVersion":3,"systemStatus":"STANDBY","type":"QUADROTOR". baseMode: [...]}
      if (packetType === "HEARTBEAT") {
        const timestamp = new Date().toLocaleString();
        console.log("Setting up heartbeat: ", timestamp);
        setLastHeartBeat({
          timestamp,
          ...packetData,
        });

        // const { autopilot, mavlinkVersion, baseMode, systemStatus, type } = packetData;
      }

      console.log("Got mavlink packet: ", packetType, packetData);
    });

    // SEND PACKET
    console.log("Requesting status");
    ws.send(
      sendMavlinkPacketCommand({
        command: "RequestMessageCommand",
        messageId: 1,
      })
    );
  });
};

export const disconnectDevicePath = () => {
  setIsConnected(false);
  wsCloseDeviceConnection(devicePath.val);
};
//

export default ws;
