import van from "vanjs-core";
import { MAVLINK_PACKET_RECEIVED, event } from "../client.js";

/**
 * {
 *  HEARTBEAT: {
            receivedOn: date,
            lastReceivedPacket: packetData,
            packetsReceived: 10
 *  }
 * }
 */
export const mavlinkPackets = {};

event.on(MAVLINK_PACKET_RECEIVED, ({ packetType, packetData }) => {
  const receivedOn = new Date().toLocaleString();

  //
  if (!mavlinkPackets[packetType]) {
    mavlinkPackets[packetType] = van.state({
      receivedOn,
      lastReceivedPacket: packetData,
      packetsReceived: 1,
    });
    return;
  }

  const { packetsReceived } = mavlinkPackets[packetType].val;

  mavlinkPackets[packetType].val = {
    receivedOn,
    lastReceivedPacket: packetData,
    packetsReceived: packetsReceived + 1,
  };

  // console.log("Got mavlink packet: ", packetType, packetData);
});
