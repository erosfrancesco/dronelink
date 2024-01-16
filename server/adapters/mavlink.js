import { MavLinkPacketSplitter, MavLinkPacketParser } from "node-mavlink";

import {
  mavlinkMessageParser,
  MavlinkPacketClasses,
  MavlinkPacketClassNames,
} from "./protocols/messages.js";

// TODO: - Let's rethink this. Maybe, instead of a wrapper, set a command pattern?
// MavLinkPacketParser has many options. Some tests are required. Need some high level setup

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

export { MavlinkPacketClassNames };

export default setupMavlinkReader;
