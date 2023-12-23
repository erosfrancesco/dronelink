import { minimal } from "node-mavlink";
import { parseMavModeFlag } from "./MavModeFlag.js";

const { MavAutopilot, MavState, MavType } = minimal;

/**
 * Heartbeat {
  type: 2,
  autopilot: 3,
  baseMode: 81,
  customMode: 0,
  systemStatus: 3,
  mavlinkVersion: 3
}
 */

export const HeartBeatParser = (data) => {
  const {
    type,
    autopilot,
    baseMode,
    customMode,
    systemStatus,
    mavlinkVersion,
  } = data;

  const packetData = {
    autopilot: MavAutopilot[autopilot],
    baseMode: parseMavModeFlag(baseMode),
    customMode,
    mavlinkVersion,
    systemStatus: MavState[systemStatus],
    type: MavType[type],
  };

  return packetData;
};
