import { common } from "node-mavlink";
import { flagsEnumParser, mapMavlinkEnum } from "./utils.js";

const { MavCmd, MavResult } = common;

// TODO: - Next
//  STATUSTEXT {"severity":2,"text":"PreArm: Hardware safety switch","id":0,"chunkSeq":0}

export const CommandAckParser = (data) => {
  const {
    command,
    result,
    progress,
    resultParam2,
    targetSystem,
    targetComponent,
  } = data;

  return {
    command: MavCmd[command],
    result: MavResult[result],
    progress,
    resultParam2,
    targetSystem,
    targetComponent,
  };
};

/**	
    command MAV_CMD	Command ID (of acknowledged command).
    result MAV_RESULT	Result of command.
    progress **	uint8_t	%		The progress percentage when result is MAV_RESULT_IN_PROGRESS. Values: [0-100], or UINT8_MAX if the progress is unknown.
    result_param2 **	int32_t			Additional result information. Can be set with a command-specific enum containing command-specific error reasons for why the command might be denied. If used, the associated enum must be documented in the corresponding MAV_CMD (this enum should have a 0 value to indicate "unused" or "unknown").
    target_system **	uint8_t			System ID of the target recipient. This is the ID of the system that sent the command for which this COMMAND_ACK is an acknowledgement.
    target_component **	uint8_t			Component ID of the target recipient. This is the ID of the system that sent the command for which this COMMAND_ACK is an acknowledgement.

    CommandAck {
        command: 512,
        result: 0,
        progress: 0,
        resultParam2: 0,
        targetSystem: 254,
        targetComponent: 1
    }
*/
