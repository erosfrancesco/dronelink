import {
  MavLinkProtocolV1,
  MavLinkProtocolV2,
  send,
  minimal,
  common,
  ardupilotmega,
  MavLinkPacketSplitter,
  MavLinkPacketParser,
} from "node-mavlink";
import { SerialPort } from "serialport";

const MavlinkPacketClasses = {
  ...minimal.REGISTRY,
  ...common.REGISTRY,
  ...ardupilotmega.REGISTRY,
};

// port parameters
const path = "COM4";
const baudRate = 9600;

let onDataReceived = (packetType, data) => {
  if (packetType === "HEARTBEAT") {
    return;
  }

  console.log(data);
};

export const setOnDataReceived = (f) => {
  onDataReceived = f;
};

export const port = await new SerialPort({
  path,
  baudRate,
});

export const reader = port
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

  onDataReceived(packetType, data);
});

export default setOnDataReceived;
