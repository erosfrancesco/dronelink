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
  sendMavlinkPacketCommandType,
  messageCommand,
} from "../../messages.js";

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

    const packetData = JSON.stringify(
      data,
      // bigint and other values??
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    );

    /*
    if (packetType !== "HEARTBEAT" && packetType !== "TIMESYNC") {
      console.log("Packet info: ", packetType, packetData);
    }
    /** */

    // TODO: - EMIT?
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
