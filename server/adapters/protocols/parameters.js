import { MavLinkProtocolV1, send, common } from "node-mavlink";

// Read param
const buildReadMessage = (args = {}) => {
  const { paramId, paramIndex = -1, ...otherArgs } = args;

  if (paramIndex < 0 && !paramId) {
    return new common.ParamRequestList();
  }

  const packet = new common.ParamRequestRead();

  if (paramId) {
    packet.paramId = paramId;
    packet.paramIndex = -1;
  } else {
    packet.paramIndex = paramIndex;
  }

  Object.keys(otherArgs).forEach((key) => {
    const value = otherArgs[key];
    packet[key] = value;
  });

  return packet;
};

// write param
const buildWriteMessage = (args = {}) => {
  const { paramId, paramValue, paramType } = args;

  const packet = new common.ParamSet();
  packet.paramId = paramId;
  packet.paramType = paramType;
  packet.paramValue = paramValue;

  return packet;
};

// read param
export const requestParamRead = async (port, args = {}) => {
  return await send(port, buildReadMessage(args), new MavLinkProtocolV1());
};

export const requestParamWrite = async (port, args = {}) => {
  return await send(port, buildWriteMessage(args), new MavLinkProtocolV1());
};
