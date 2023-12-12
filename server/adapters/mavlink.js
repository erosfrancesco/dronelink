import {
  MavLinkProtocolV2,
  send,
  MavLinkPacketSplitter,
  MavLinkPacketParser,
  minimal,
  common,
  ardupilotmega,
} from "node-mavlink";
import { messageCommand } from "./utils.js";

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

    onPacketReceived(packetType, packetData);
  });

  return reader;
};

export const sendPacketCommand = (port, command, args = {}) => {
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
  return send(port, packet, new MavLinkProtocolV2());
};

export const getAvailableCommands = () => Object.keys(Commands);

// WS ADAPTER
export const sendMavlinkPacketCommandType = "on_packet_send"; // THIS MUST BE EXPOSED

export const sendMavlinkPacketCommand = ({ command, ...otherArgs }) => {
  const res = JSON.stringify({
    type: sendMavlinkPacketCommandType,
    command,
    ...otherArgs,
  });

  return res;
};

export const handleMavlinkPacketSend = async (ws, { type, ...args }) => {
  if (type !== sendMavlinkPacketCommandType) {
    return;
  }

  const { command, ...otherArgs } = args;
  const port = ws.deviceConnected; //
  const res = await sendPacketCommand(port, command, otherArgs);

  ws.send(messageCommand({ message: "MAVLINK packet sent: " + res }));
};

export default setupMavlinkReader;
