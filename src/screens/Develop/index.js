import van from "vanjs-core";
import {
  MAVLINK_PACKET_RECEIVED,
  event,
  wsParameterRead,
} from "../../client/index.js";
import { widget } from "./widget.js";
import { mavlinkClasses, mavlinkPackets } from "../../logic/index.js";
import { MavlinkPacketWrapper } from "../../components/index.js";
import { MavlinkPacketClasses, YawParameterP } from "./mocks.js";

const { div, span, input } = van.tags;

//
let singleton = false;
const setupWithMock = () => {
  if (singleton) {
    return;
  }

  singleton = true;

  mavlinkClasses.val = MavlinkPacketClasses;
  const packetType = MavlinkPacketClasses.PARAM_VALUE;

  setTimeout(() => {
    mavlinkPackets.val[packetType] = {
      lastReceivedPacket: YawParameterP,
    };

    event.emit(
      MAVLINK_PACKET_RECEIVED + "-" + packetType,
      mavlinkPackets.val[packetType]
    );
  }, 2200);

  setTimeout(() => {
    mavlinkPackets.val[packetType] = {
      lastReceivedPacket: { ...YawParameterP, paramValue: 0.466536 },
    };

    event.emit(
      MAVLINK_PACKET_RECEIVED + "-" + packetType,
      mavlinkPackets.val[packetType]
    );
  }, 1200);
};
const writeParameter = (packet) => {
  console.log(packet);
};

//
const sendParamRequest = () => {
  wsParameterRead({ paramId: "ATC_ANG_YAW_P" });
};

export const Develop = () => {
  setupWithMock();
  return widget({ paramId: "ATC_ANG_YAW_P" });
};

export default Develop;
