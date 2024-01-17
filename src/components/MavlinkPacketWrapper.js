import van from "vanjs-core";
import { MAVLINK_PACKET_RECEIVED, event } from "../client/index.js";
import { mavlinkClasses, mavlinkPackets } from "../logic/index.js";

const { div } = van.tags;

export const MavlinkPacketWrapper = (
  { packetName, onPacketReceived = () => {} },
  child = () => {}
) => {
  const packetType = (mavlinkClasses.val || {})[packetName];
  const data = van.state(mavlinkPackets.val[packetType] || {});

  if (packetType) {
    event.on(MAVLINK_PACKET_RECEIVED + "-" + packetType, (e) => {
      data.val = e;
      onPacketReceived(e);
    });
  }

  return div(van.derive(() => child({ data })));
};
