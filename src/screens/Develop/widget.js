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
// import { wsParameterRead, wsParameterWrite } from "../../client/index.js";
import { MavlinkPacketWrapper } from "../../components/index.js";
const { div, span, input } = van.tags;

//
const writeParameter = (packet) => {
  console.log(packet);
  // wsParameterWrite(packet);
};

const readParameter = () => {
  console.log("Hello parameter");
  // wsParameterRead({ paramId: "ATC_ANG_YAW_P" });
};
//

// TODO: - not necessary. parseFloat should be the solution to everything
//
const computeInputTypeProps = (paramType) => {
  const isUnsigned = paramType % 2;
  const paramTypeIndex = (paramType - isUnsigned) / 2;
  const nBit = 2 ** (paramTypeIndex + 3);

  if (paramType < 9) {
    if (paramType < 7) {
      // unsigned
      if (isUnsigned) {
        return {
          step: 1,
          min: 0,
          max: 2 ** nBit - 1,
        };
      }

      //signed
      return {
        step: 1,
        min: -(2 ** (nBit - 1)),
        max: 2 ** (nBit - 1) - 1,
      };
    }

    // MAV_PARAM_TYPE_UINT64	64-bit unsigned integer 0-18446744073709551615
    // MAV_PARAM_TYPE_INT64	    64-bit signed integer
    if (isUnsigned) {
      return {
        type: "bigint",
        step: BigInt(1),
        min: BigInt(0),
        max: BigInt(-1) + BigInt(2 ** nBit), // for 64-bit unsigned integer
      };
    }

    return {
      type: "bigint",
      step: BigInt(1),
      min: BigInt(-(2 ** (nBit - 1))),
      max: BigInt(-1) + BigInt(2 ** (nBit - 1)),
    };
  }

  /*
  // TODO: - Float
  if (paramType === 8) {
    return {
      step: 1,
      min: 0,
      max: BigInt(-1 + 2 ** nBit),
    };
  }

  if (paramType === 9) {
    return {
      step: 1,
      min: 0,
      max: 18446744073709551615,
    };
  }
  /** */

  return {
    step: "0.0000000001",
  };
};
//

export const widget = ({ paramId }) => {
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
            // ...computeInputTypeProps(7),
            // type: "number",
            // Maybe string?
            value: inputValue,
            disabled: inputValue.val === null || inputValue.val === undefined,
            onkeyup: (e) => {
              if (e.key === "Enter") {
                writeParameter({
                  paramId,
                  paramValue: inputValue.val,
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
