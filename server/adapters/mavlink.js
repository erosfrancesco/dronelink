import {
  MavLinkProtocolV2,
  send,
  MavLinkPacketSplitter,
  MavLinkPacketParser,
  minimal,
  common,
  ardupilotmega,
} from "node-mavlink";

import {
  HeartBeatParser,
  CommandAckParser,
  defaultDataParser,
} from "../parsers/index.js";

//
const Commands = {
  ...minimal,
  ...common,
  ...ardupilotmega,
};

const PacketClasses = {
  ...minimal.REGISTRY,
  ...common.REGISTRY,
  ...ardupilotmega.REGISTRY,
};
//

const mavlinkPacketDataParser = (packetType, data) => {
  if (packetType === "HEARTBEAT") {
    return HeartBeatParser(data);
  }

  if (packetType === "COMMAND_ACK") {
    return CommandAckParser(data);
  }

  if (packetType === "TIMESYNC") {
    return defaultDataParser(data);
  }

  console.log("Received", packetType, data);

  return defaultDataParser(data);
};

export const setupMavlinkReader = (port, onPacketReceived = () => () => {}) => {
  const reader = port
    .pipe(new MavLinkPacketSplitter())
    .pipe(new MavLinkPacketParser());

  reader.on("data", (packet) => {
    const packetClass = PacketClasses[packet.header.msgid];
    if (!packetClass) {
      return;
    }

    const { protocol, payload } = packet;
    const data = protocol.data(payload, packetClass);
    const packetType = packetClass.MSG_NAME;

    // Packets parsers
    const packetData = mavlinkPacketDataParser(packetType, data);
    onPacketReceived(packetType, packetData);
  });

  return reader;
};

export const sendPacket = async (port, command, args = {}) => {
  const packet = new (Commands[command] ||
    Commands.RequestProtocolVersionCommand)();

  // merge parameters
  // spread operator gives some issues here. Better to do it old style.
  Object.keys(args).map((key) => {
    const value = args[key];
    packet[key] = value;
  });

  // The default protocol is v1
  const res = await send(port, packet, new MavLinkProtocolV2());

  return res;
};

// TODO: - MAKE ADAPTER
export const getAvailableCommands = () => Object.keys(Commands); // UNUSED FOR NOW

export default setupMavlinkReader;
