import {
  MavLinkProtocolV1,
  MavLinkProtocolV2,
  send,
  minimal,
  common,
  ardupilotmega,
} from "node-mavlink";

// TODO: - Set param

// Read param
const buildMavlinkPacket = (args = {}) => {
  const { paramId, paramIndex = -1, ...otherArgs } = args;

  if (paramIndex < 0 && !paramId) {
    return new common.ParamRequestList();
  }

  const message = new common.ParamRequestRead();

  if (paramId) {
    message.paramId = paramId;
    message.paramIndex = -1;
  } else {
    message.paramIndex = paramIndex;
  }

  Object.keys(otherArgs).forEach((key) => {
    const value = otherArgs[key];
    message[key] = value;
  });

  return message;
};

// read param
export const requestParamRead = async (port, args = {}) => {
  return await send(port, buildMavlinkPacket(args), new MavLinkProtocolV1());
};

export default requestParamRead;
