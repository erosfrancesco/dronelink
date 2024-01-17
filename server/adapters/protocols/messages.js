import { minimal, common, ardupilotmega } from "node-mavlink";

import {
  HeartBeatParser,
  CommandAckParser,
  defaultDataParser,
  parseStatusText,
  parseSysStatus,
} from "../../parsers/index.js";

//
export const MavlinkPacketClasses = {
  ...minimal.REGISTRY,
  ...common.REGISTRY,
  ...ardupilotmega.REGISTRY,
};

export const MavlinkPacketClassNames = Object.keys(MavlinkPacketClasses).reduce(
  (res, key) => {
    const { MSG_NAME } = MavlinkPacketClasses[key];
    res[MSG_NAME] = MSG_NAME;

    return res;
  },
  {}
);
//

export const mavlinkMessageParser = (packetType, data, msgId) => {
  if (packetType === MavlinkPacketClassNames.HEARTBEAT) {
    return HeartBeatParser(data);
  }

  if (packetType === MavlinkPacketClassNames.COMMAND_ACK) {
    return CommandAckParser(data);
  }

  if (packetType === MavlinkPacketClassNames.TIMESYNC) {
    return defaultDataParser(data);
  }

  if (packetType === MavlinkPacketClassNames.STATUSTEXT) {
    return parseStatusText(data);
  }

  if (packetType === MavlinkPacketClassNames.SYS_STATUS) {
    return parseSysStatus(data);
  }

  return defaultDataParser(data);
};
