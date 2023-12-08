import { mavlinkPacketReceived } from "./messages/actions.js";
import {
  MavLinkPacketSplitter,
  MavLinkPacketParser,
  minimal,
  common,
  ardupilotmega,
} from "node-mavlink";

// TODO: -------------------------------------------------------------------------------------
// VFR_HUD

export const REGISTRY = {
  ...minimal.REGISTRY,
  ...common.REGISTRY,
  ...ardupilotmega.REGISTRY,
};

export const setupMavlinkReader = (connection, port) => {
  const reader = port
    .pipe(new MavLinkPacketSplitter())
    .pipe(new MavLinkPacketParser());

  reader.on("data", (packet) => {
    const packetClass = REGISTRY[packet.header.msgid];
    if (!packetClass) {
      return;
    }

    const { protocol, payload } = packet;
    const data = protocol.data(payload, packetClass);
    const packetType = packetClass.MSG_NAME;

    const res = JSON.stringify(
      {
        type: mavlinkPacketReceived,
        packetType,
        packetClass,
        data,
      },
      // bigint and other values??
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    );

    connection.send(res);
  });

  return reader;
};

export default {
  setupMavlinkReader,
  REGISTRY,
};
