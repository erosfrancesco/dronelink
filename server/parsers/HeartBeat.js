import { minimal, common, ardupilotmega } from "node-mavlink";

import { parseMavModeFlag } from "./MavModeFlag.js";

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
    autopilot: minimal.MavAutopilot[autopilot],
    baseMode: parseMavModeFlag(baseMode),
    customMode,
    mavlinkVersion,
    systemStatus: minimal.MavState[systemStatus],
    type: minimal.MavType[type],
  };

  return packetData;
};
