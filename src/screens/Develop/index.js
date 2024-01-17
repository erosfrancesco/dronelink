import van from "vanjs-core";
import ws, {
  MAVLINK_PACKET_RECEIVED,
  event,
  wsParameterRead,
} from "../../client/index.js";
import { mavlinkClasses, mavlinkPackets } from "../../logic/index.js";

import { MavlinkPacketClasses, YawParameterP } from "./mocks.js";

const { div, span } = van.tags;

const setupWithMock = () => {
  mavlinkClasses.val = MavlinkPacketClasses;

  const packetType = MavlinkPacketClasses.PARAM_VALUE;
  mavlinkPackets.val[packetType] = {
    lastReceivedPacket: YawParameterP,
  };

  setTimeout(() => {
    event.emit(
      MAVLINK_PACKET_RECEIVED + "-" + packetType,
      mavlinkPackets.val[packetType]
    );
  }, 200);
};

const sendParamRequest = () => {
  wsParameterRead({ paramId: "ATC_ANG_YAW_P" });
};

// TODO: - Widget to read and send request for param
// TODO: - fetch from https://autotest.ardupilot.org/Parameters/ArduCopter/apm.pdef.xml

const widget = () => {
  setupWithMock();

  const packetType = mavlinkClasses.val?.PARAM_VALUE;
  const data = van.state(mavlinkPackets.val[packetType] || {});

  // console.log(data);

  if (packetType) {
    event.on(MAVLINK_PACKET_RECEIVED + "-" + packetType, (e) => {
      data.val = e;

      const { lastReceivedPacket } = e;
      if (lastReceivedPacket.paramId === "STAT_RUNTIME") {
      } // remove time sync

      const { paramId, paramType, paramValue } = lastReceivedPacket;
      // Yaw P parameter
      if (paramId === "ATC_ANG_YAW_P") {
        console.log(paramId, paramValue);
      }
    });
  }

  return div(van.derive(() => div()));
};

export const Develop = () => {
  return div(van.derive(() => widget()));
};

export default Develop;
