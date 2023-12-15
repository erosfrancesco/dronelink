import van from "vanjs-core";
import ws, {
  setOnDeviceConnected,
  setOnMavlinkPacketReceived,
  wsOpenDeviceConnection,
  wsCloseDeviceConnection,
} from "../client.js";

import { sendMavlinkPacketCommand } from "../../messages.js";

// STATE
export const isConnected = van.state(false);
export const setIsConnected = (value) => (isConnected.val = value);
export const devicePath = van.state("COM6");
export const setDevicePath = (value) => (devicePath.val = value);
export const lastHeartBeat = van.state({});
export const setLastHeartBeat = (value) => (lastHeartBeat.val = value);
//

// ACTIONS
export const openDevicePath = () => {
  wsOpenDeviceConnection(devicePath.val);

  setOnDeviceConnected(() => {
    setIsConnected(true);
    setOnMavlinkPacketReceived((packetType, packetData) => {
      // mavlink packet event. Here the logic should manage the data

      /**{"type":2,"autopilot":3,"baseMode":81,"customMode":0,"systemStatus":3,"mavlinkVersion":3} */
      // Somewhere...
      if (packetType === "HEARTBEAT") {
        const timestamp = new Date().toLocaleString();
        console.log("Setting up heartbeat: ", timestamp);
        setLastHeartBeat({
          timestamp,
          ...packetData,
        });
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
