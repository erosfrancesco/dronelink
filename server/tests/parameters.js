import { send, common } from "node-mavlink";
import { SerialPort } from "serialport";

import { port, reader, setOnDataReceived } from "./mavlink.js";

setOnDataReceived((packetType, data) => {
  console.log("got", packetType);
  // filter out heartbeat and timesync
  if (packetType === "HEARTBEAT") {
    return;
  }

  if (packetType === "TIMESYNC") {
    return;
  }

  if (packetType === "PARAM_VALUE") {
    const { paramId, paramValue, paramType } = data;
    const type = common.MavParamType[paramType];
    if (paramId === "ATC_ANG_YAW_P") {
      console.log("Got YAW P parameter", paramValue, type);

      /*
      const message = new common.ParamSet();
      message.paramId = "ATC_ANG_YAW_P";
      message.paramValue = 4.1;
      message.paramType = 9;
      message.targetSystem = 1;
      message.targetComponent = 1;
      send(port, message);
      /** */
    }

    return;
  }
});

const message = new common.ParamRequestRead();
message.paramId = "ATC_ANG_YAW_P";
message.paramIndex = -1;
message.targetSystem = 1;
message.targetComponent = 1;

await send(port, message);

/**
 * ParamValue {
  paramId: 'ATC_ANG_YAW_P',
  paramValue: 4,
  paramType: 9, // REAL32
  paramCount: 886,
  paramIndex: 65535
}
 */
