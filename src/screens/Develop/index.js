import van from "vanjs-core";
import { MAVLINK_PACKET_RECEIVED, event } from "../../client/index.js";
import { ParameterWatcher } from "../../ui/ParamWatcher.widget.js";
import { mavlinkClasses, mavlinkPackets } from "../../logic/index.js";
import { MavlinkPacketClasses, YawParameterP } from "./mocks.js";

import { loadXML, xmlParser } from "./parameters.js";

const fieldParser = (field) => {
  const { attributes, childNodes } = field;
  const { value: name } = attributes.name;
  const { nodeValue: value } = childNodes[0];

  return { name, value };
};

const a = async () => {
  const data = await loadXML("param.xml");
  const parsed = xmlParser(data);
  const parametersData =
    parsed.document.childNodes[0].childNodes[0].childNodes[0].childNodes;

  const parameters = parametersData.map((data) => {
    const { attributes, childNodes } = data;
    const { documentation: docNode, name: nameNode, humanName } = attributes;

    const documentation = docNode.value;
    const name = nameNode.value;
    const readableName = humanName.value;
    const fieldsArray = childNodes.map(fieldParser);
    const fields = fieldsArray.reduce((acc, field) => {
      const { name, value } = field;
      acc[name] = value;

      return acc;
    }, {});

    return { documentation, name, readableName, fields };
  });

  console.log(parameters, parametersData);
};
a();

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
  setupWithMock();

  return div(
    ParameterWatcher({
      setup: () => {},
      paramId: "AHRS_YAW_P",
      parameterOptions: {
        type: "range",
        min: "0.1",
        max: "0.4",
        increment: 0.01,
      },
    })
    /*
    ParameterWatcher({ paramId: "ATC_RAT_YAW_P" }),
    ParameterWatcher({ paramId: "ATC_RAT_YAW_I" }), // 0.07999999821186066
    ParameterWatcher({ paramId: "ATC_RAT_YAW_D" })
    // AHRS_TRIM_X
    /** */
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
