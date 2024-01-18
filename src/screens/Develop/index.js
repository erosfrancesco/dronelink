import van from "vanjs-core";
import {
  MAVLINK_PACKET_RECEIVED,
  event,
  wsParameterRead,
} from "../../client/index.js";
import { ParameterWatcher } from "./widget.js";
import { mavlinkClasses, mavlinkPackets } from "../../logic/index.js";
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
//

export const Develop = () => {
  // setupWithMock();
  return ParameterWatcher({ paramId: "ATC_ANG_YAW_P" });
};

export default Develop;
