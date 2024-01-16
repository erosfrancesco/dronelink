import van from "vanjs-core";
import WidgetBorders from "../../components/WidgetBorders.js";
import { Input, Button } from "../../components/index.js";

import { mavlinkPackets } from "../../logic/index.js";
import { MAVLINK_PACKET_RECEIVED, event } from "../../client.js";

const { div, span } = van.tags;

const width = van.state("25em");

// Filter ?
// TODO: - Packet tree and prop views

const packetTypesReceived = van.state([]);
event.on(MAVLINK_PACKET_RECEIVED, ({ packetType, packetData }) => {
  const oldValue = [...packetTypesReceived.val];

  const i = oldValue.findIndex((item) => {
    return item.packetType === packetType;
  });

  if (i >= 0) {
    oldValue[i] = { packetType, packetData };
  } else {
    console.log("Got new data: ", packetData);
    oldValue.push({ packetType, packetData });
  }

  packetTypesReceived.val = [...oldValue];
});

const PacketClassDetails = ({ packetType, packetData }) => {
  // console.log(packetType, packetData);

  return div(
    span(packetType),
    div(
      Object.keys(packetData).map((key) =>
        div(span(key + ":"), span(packetData[key]))
      )
    )
  );
};

const PacketList = ({ packetTypesReceived }) =>
  packetTypesReceived.val.map((packet) => {
    return div(PacketClassDetails(packet || {}));
  });

export const Develop = () => {
  return div(van.derive(() => div(PacketList({ packetTypesReceived }))));
};

export default Develop;
