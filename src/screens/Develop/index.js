import van from "vanjs-core";
import {
  MAVLINK_PACKET_RECEIVED,
  event,
  wsParameterRead,
} from "../../client/index.js";
import { ParameterWatcher } from "../../ui/ParamWatcher.widget.js";
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
  return div(
    ParameterWatcher({ paramId: "ATC_RAT_YAW_P" }),
    ParameterWatcher({ paramId: "ATC_RAT_YAW_I" }), // 0.07999999821186066
    ParameterWatcher({ paramId: "ATC_RAT_YAW_D" })
  );
};

export default Develop;
/**
Roll angular P gain ATC_ANG_RLL_P
Roll rate P, I and D gains ATC_RAT_RLL_P, ATC_RAT_RLL_I, ATC_RAT_RLL_D
Roll max acceleration ATC_ACCEL_R_MAX

Pitch angular P gain ATC_ANG_PIT_P
Pitch rate P, I and D gains ATC_RAT_PIT_P, ATC_RAT_PIT_I, ATC_RAT_PIT_D
Pitch max acceleration ATC_ACCEL_P_MAX

Yaw angular P gain ATC_ANG_YAW_P
Yaw rate P, I gain ATC_RAT_YAW_P, ATC_RAT_YAW_I, ATC_RAT_YAW_D
Yaw rate D gain ATC_RAT_YAW_D (in AC4.4 and higher)

Yaw rate filter ATC_RAT_YAW_FLTT, ATC_RAT_YAW_FLTE (in AC3.6: ATC_RAT_YAW_FLT)

Yaw max acceleration ATC_ACCEL_Y_MAX
 */

/**
Drone reacts slowly and hovers bad or unstable (eg dances, wobbles)
Increase P-value and decrease D value. Maybe decrease I value. 
The P value must in no case be higher than the above-determined threshold.

During hover the drone drifts
Increase the I term and possibly P-value.

Oscillation during fast flights
I-value too high or too low - depending on the drone.

Drone oscillates slightly with disturbances (eg nudge or gust of wind)
D value down

Drone reacts too slowly to disturbances (eg nudge or gust of wind)
Increase D-value and possibly P-value.
 */