import { ardupilotmega, common, minimal } from "node-mavlink";
import { mapMavlinkEnum } from "./utils.js";

export const getCommandList = () => {
  return mapMavlinkEnum({ ...common.MavCmd, ...ardupilotmega.MavCmd });
};
