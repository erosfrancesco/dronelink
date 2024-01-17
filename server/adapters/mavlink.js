import { MavLinkPacketSplitter, MavLinkPacketParser } from "node-mavlink";

import {
  mavlinkMessageParser,
  MavlinkPacketClasses,
} from "./protocols/messages.js";

export { MavlinkPacketClasses };

// MavLinkPacketParser has many options.
// Maybe some higher-order setup options?

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
    const packetData = mavlinkMessageParser(packetType, data);

    onPacketReceived(packetType, packetData);
  });

  return reader;
};
