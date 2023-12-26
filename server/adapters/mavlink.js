import {
  MavLinkProtocolV2,
  MavLinkPacketSplitter,
  MavLinkPacketParser,
  send,
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
  ...minimal.COMMANDS,
  ...common.COMMANDS,
  ...ardupilotmega.COMMANDS,
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
  const commandMap = { ...common.MavCmd, ...ardupilotmega.MavCmd };
  const commandId = commandMap[command];

  if (!commandId && commandId !== 0) {
    // command not found...
    // TODO: -
    return 44;
  }

  const packet = new Commands[commandId](args);
  const res = await send(port, packet, new MavLinkProtocolV2());

  return res;
};

export default setupMavlinkReader;
