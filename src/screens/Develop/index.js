import van from "vanjs-core";
import {
  MAVLINK_PACKET_RECEIVED,
  event,
  wsParameterRead,
} from "../../client/index.js";
import { mavlinkClasses, mavlinkPackets } from "../../logic/index.js";
import { MavlinkPacketWrapper } from "../../components/index.js";
import { MavlinkPacketClasses, YawParameterP } from "./mocks.js";

const { div, span } = van.tags;

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
const sendParamRequest = () => {
  wsParameterRead({ paramId: "ATC_ANG_YAW_P" });
};

// TODO: - Widget to read and write param
// TODO: - Optional. fetch from https://autotest.ardupilot.org/Parameters/ArduCopter/apm.pdef.xml

const widget = ({ paramId }) => {
  const lastPacket = van.state({});
  const packetValueHistory = van.state([]);

  return MavlinkPacketWrapper(
    {
      packetName: "PARAM_VALUE",
      onPacketReceived: (e) => {
        const { lastReceivedPacket } = e;
        const {
          paramId: packetParamId,
          paramType,
          paramValue,
        } = lastReceivedPacket;

        if (paramId === packetParamId) {
          packetValueHistory.val.push(paramValue);
          lastPacket.val = lastReceivedPacket;
        }
      },
    },
    () => {
      const { paramValue, paramId } = lastPacket.val || {};

      return div(
        () => span(paramId),
        div(),
        () => span(paramValue),
        div(),
        () => span("Previous values: "),
        div(),
        packetValueHistory.val.map((value, i) => {
          if (i > packetValueHistory.val.length - 2) {
            return;
          }
          return div(() => span(value));
        })
      );
    }
  );
};

export const Develop = () => {
  setupWithMock();
  return widget({ paramId: "ATC_ANG_YAW_P" });
};

export default Develop;
