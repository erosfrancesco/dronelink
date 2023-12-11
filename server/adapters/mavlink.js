// TO BE INCLUDED
import { mavlinkPacketReceived } from "../messages/actions.js";
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

export const setupMavlinkReader = (ws, port, onPacketReceived = () => {}) => {
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

    onPacketReceived(data, packetType, packetClass, packet)

    /*
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

    ws.send(res);
    /** */
  });

  // TODO: - Set up ws command for this...
  // ParamRequestList
  sendTestPacket(
    port /*
    "ParamRequestList", {
    targetSystem: 1,
    targetComponent: 1,
  }/** */
  ).then((res) => {
    console.log("Packet sent", res);
    ws.send(
      JSON.stringify({
        type: "chat",
        message: "Test packet sent.",
      })
    );
  });

  return reader;
};

// Still a work in progress, but we're here...
export const sendTestPacket = async (port, command, args = {}) => {
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

export default {
  sendTestPacket,
  setupMavlinkReader,
  getAvailableCommands,
};
