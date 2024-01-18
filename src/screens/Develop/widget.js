/**
1   MAV_PARAM_TYPE_UINT8	8-bit unsigned integer 0-255 (2^8 - 1)
2	MAV_PARAM_TYPE_INT8  	8-bit signed integer -128 +127 (-2^7, 2^7 - 1)
3	MAV_PARAM_TYPE_UINT16	16-bit unsigned integer 0-65535
4	MAV_PARAM_TYPE_INT16	16-bit signed integer
5	MAV_PARAM_TYPE_UINT32	32-bit unsigned integer 0-4294967295
6	MAV_PARAM_TYPE_INT32	32-bit signed integer
7	MAV_PARAM_TYPE_UINT64	64-bit unsigned integer 0-18446744073709551615
8	MAV_PARAM_TYPE_INT64	64-bit signed integer
9	MAV_PARAM_TYPE_REAL32	32-bit floating-point
10	MAV_PARAM_TYPE_REAL64	64-bit floating-point
 */
// TODO: - Optional. fetch from https://autotest.ardupilot.org/Parameters/ArduCopter/apm.pdef.xml
import van from "vanjs-core";
import { wsParameterRead, wsParameterWrite } from "../../client/index.js";
import { MavlinkPacketWrapper } from "../../components/index.js";
const { div, span, input } = van.tags;

//
const writeParameter = (packet) => {
  console.log(packet);
  wsParameterWrite(packet);
};

const readParameter = (paramId) => {
  console.log("Hello parameter", paramId);
  wsParameterRead({ paramId });
};
//

//
const computeParamValue = (input) => {
  return parseFloat(input);
};

const setupWidget = (paramId) => {
  readParameter(paramId);
};

// TODO: - not necessary. parseFloat should be the solution to everything

export const ParameterWatcher = ({ paramId }) => {
  const lastPacket = van.state({});
  const packetValueHistory = van.state([]);
  const setupDone = van.state(false);

  if (!setupDone.val) {
    setupWidget(paramId);
    setupDone.val = true;
  }

  return MavlinkPacketWrapper(
    {
      packetName: "PARAM_VALUE",
      onPacketReceived: (e) => {
        const { lastReceivedPacket } = e;
        const {
          paramId: packetParamId,
          // paramType,
          paramValue,
        } = lastReceivedPacket;

        if (paramId === packetParamId) {
          packetValueHistory.val.unshift(paramValue);
          lastPacket.val = lastReceivedPacket;
        }
      },
    },
    () => {
      const { paramValue, paramId, paramType } = lastPacket.val || {};
      const inputValue = van.state(paramValue);
      const previousValues = packetValueHistory.val.map((v, i) => {
        if (i) {
          return v;
        }
      });

      return div(
        () => span(paramId + " : " + paramValue),
        div(
          span("Set new value "),
          input({
            type: "number",
            value: () => inputValue.val,
            disabled: () =>
              inputValue.val === null || inputValue.val === undefined,
            onkeyup: (e) => {
              const { value } = e.target;
              inputValue.val = value;

              if (e.key === "Enter") {
                writeParameter({
                  paramId,
                  paramValue: computeParamValue(value),
                  paramType,
                });
              }
            },
          })
        ),
        div(
          span("Previous values: "),
          previousValues.map((value, i) => {
            return div(() => span(value));
          })
        )
      );
    }
  );
};
