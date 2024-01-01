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
export const mavlinkPackets = van.state({});

event.on(MAVLINK_PACKET_RECEIVED, ({ packetType, packetData }) => {
  const receivedOn = new Date().toLocaleString();
  const { packetsReceived } = mavlinkPackets.val[packetType]?.val || {};

  const newState = packetsReceived
    ? {
        receivedOn,
        lastReceivedPacket: packetData,
        packetsReceived: packetsReceived + 1,
      }
    : {
        receivedOn,
        lastReceivedPacket: packetData,
        packetsReceived: 1,
      };

  mavlinkPackets.val = van.derive(() => {
    mavlinkPackets.val[packetType] = newState;

    return mavlinkPackets.val;
  });

  //
  if (!mavlinkPackets.val[packetType]) {
    mavlinkPackets.val[packetType] = van.state({
      receivedOn,
      lastReceivedPacket: packetData,
      packetsReceived: 1,
    });
    return;
  }

  /*
  mavlinkPackets.val[packetType].val = {
    receivedOn,
    lastReceivedPacket: packetData,
    packetsReceived: packetsReceived + 1,
  };

  mavlinkPackets.val.toggle = !mavlinkPackets.val.toggle;
  /** */

  // console.log("Got mavlink packet: ", packetType, packetData);
});
