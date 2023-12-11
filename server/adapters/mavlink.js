import {
  MavLinkProtocolV2,
  send,
  MavLinkPacketSplitter,
  MavLinkPacketParser,
  minimal,
  common,
  ardupilotmega,
} from "node-mavlink";

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
  console.log("Reader ok", port);

  reader.on("data", (packet) => {
    const packetClass = PacketClasses[packet.header.msgid];
    if (!packetClass) {
      return;
    }

    const { protocol, payload } = packet;
    const data = protocol.data(payload, packetClass);
    const packetType = packetClass.MSG_NAME;

    onPacketReceived(data, packetType, packetClass, packet);
  });

  return reader;
};

export const sendPacketCommand = async (port, command, args = {}) => {
  const packet = new (Commands[command] ||
    Commands.RequestProtocolVersionCommand)();

  // merge parameters
  // spread operator gives some issues here. Better to it old style.
  Object.keys(args).map((key) => {
    const value = args[key];
    packet[key] = value;
    console.log("Set up param", key, value);
  });

  // The default protocol is v1
  return await send(port, packet, new MavLinkProtocolV2());
};

export const getAvailableCommands = () => Object.keys(Commands);

// WS ADAPTER
export const parseMavlinkPacketCommandType = "on_packet_read"; // THIS MUST BE EXPOSED

export const parseMavlinkPacketCommand = (data, packetType, packetClass) => {
  return JSON.stringify(
    { type: parseMavlinkPacketCommandType, data, packetType, packetClass },
    // bigint and other values??
    (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
  );
};

export const handleMavlinkPacketRead = (ws, { type, ...args }) => {
  if (type !== parseMavlinkPacketCommandType) {
    return;
  }

  const { data, packetType } = args;
  console.log("Got mavlink packet:", packetType, data);
};

export default setupMavlinkReader;
