import van from "vanjs-core";
import {
  MAVLINK_PACKET_RECEIVED,
  PACKET_CLASSES_RECEIVED,
  event,
} from "../client/index.js";

export { MAVLINK_PACKET_RECEIVED, event };

/**
  mavlinkPackets = {
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

export const mavlinkClasses = van.state({});
export const setMavlinkClasses = (v) => {
  mavlinkClasses.val = v;
};

event.on(PACKET_CLASSES_RECEIVED, (classes) => setMavlinkClasses(classes));

event.on(
  MAVLINK_PACKET_RECEIVED,
  ({ packetType, packetData: lastReceivedPacket }) => {
    const receivedOn = new Date().toLocaleString();
    const { packetsReceived: oldReceived } =
      mavlinkPackets.val[packetType] || {};
    const packetsReceived = (oldReceived || 0) + 1;

    mavlinkPackets.val[packetType] = {
      lastReceivedPacket,
      packetsReceived,
      receivedOn,
    };

    event.emit(
      MAVLINK_PACKET_RECEIVED + "-" + packetType,
      mavlinkPackets.val[packetType]
    );
  }
);
