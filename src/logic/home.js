import van from "vanjs-core";
import { MAVLINK_PACKET_RECEIVED, event } from "../client.js";
import { commandAckReceived } from "./commands.js";

// TODO: - Rename this file
export const lastHeartBeat = van.state({});
export const setLastHeartBeat = (value) => (lastHeartBeat.val = value);

event.on(MAVLINK_PACKET_RECEIVED, ({ packetType, packetData }) => {
  // mavlink packet event. Here the logic should manage the data

  // PARSE HEARTBEAT PACKAGE
  if (packetType === "HEARTBEAT") {
    const timestamp = new Date().toLocaleString();

    setLastHeartBeat({
      timestamp,
      ...packetData,
    });

    return;
  }

  // PARSE COMMAND_ACK PACKAGE
  if (packetType === "COMMAND_ACK") {
    commandAckReceived(packetData);
    return;
  }

  console.log("Got mavlink packet: ", packetType, packetData);
});
//
