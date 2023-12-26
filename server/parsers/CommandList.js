import { ardupilotmega, common, minimal } from "node-mavlink";
import { mapMavlinkEnum } from "./utils.js";

const getAvailableCommands = () => {
  return mapMavlinkEnum({ ...common.MavCmd, ...ardupilotmega.MavCmd });
};

export const getCommandList = () => {
  // [{value: '16', flag: 'NAV_WAYPOINT'}]
  const commandList = getAvailableCommands();
  // { NAV_WAYPOINT: '16' }
  const commandMap = {};
  commandList.forEach(({ value, flag }) => {
    commandMap[flag] = value;
  });

  return { commandList, commandMap };
};
