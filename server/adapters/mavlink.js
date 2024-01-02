import { MavLinkPacketSplitter, MavLinkPacketParser } from "node-mavlink";

import {
  mavlinkPacketDataParser,
  MavlinkPacketClasses,
  MavlinkPacketClassNames,
} from "./mavlinkParser.js";

export const setupMavlinkReader = (port, onPacketReceived = () => () => {}) => {
  const reader = port
    .pipe(new MavLinkPacketSplitter())
    .pipe(new MavLinkPacketParser());

  reader.on("data", (packet) => {
    const packetClass = MavlinkPacketClasses[packet.header.msgid];
    if (!packetClass) {
      return;
    }

    const { protocol, payload } = packet;
    const data = protocol.data(payload, packetClass);
    const packetType = packetClass.MSG_NAME;
    const packetData = mavlinkPacketDataParser(packetType, data);

    onPacketReceived(packetType, packetData);
  });

  return reader;
};

export { MavlinkPacketClassNames };

export default setupMavlinkReader;
