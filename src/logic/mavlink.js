import van from "vanjs-core";
import {
  MAVLINK_PACKET_RECEIVED,
  PACKET_CLASSES_RECEIVED,
  event,
} from "../client.js";

/**
  mavlinkPackets.val = {
    ...
    HEARTBEAT: {
      receivedOn: date,
      lastReceivedPacket: packetData,
      packetsReceived: 10
    }
    ...
  }
 */
export const mavlinkPackets = van.state({});
export const setMavlinkPackets = (v) => {
  mavlinkPackets.val = v;
};
export const mavlinkClasses = van.state({});
export const setMavlinkClasses = (v) => {
  mavlinkClasses.val = v;
};

event.on(PACKET_CLASSES_RECEIVED, (classes) => setMavlinkClasses(classes));

event.on(MAVLINK_PACKET_RECEIVED, ({ packetType, packetData }) => {
  const receivedOn = new Date().toLocaleString();
  const { packetsReceived } = mavlinkPackets.val[packetType]?.val || {};

  setMavlinkPackets(
    van.derive(() => {
      mavlinkPackets.val[packetType] = packetsReceived
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
      return mavlinkPackets.val;
    })
  );
});
