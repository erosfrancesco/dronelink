import {
  MavLinkProtocolV2,
  send,
  minimal,
  common,
  ardupilotmega,
} from "node-mavlink";

//
const Commands = {
  ...minimal.COMMANDS,
  ...common.COMMANDS,
  ...ardupilotmega.COMMANDS,
};

export const sendMavlinkCommandPacket = async (port, command, args = {}) => {
  const commandMap = { ...common.MavCmd, ...ardupilotmega.MavCmd };
  const commandId = commandMap[command];

  if (!commandId && commandId !== 0) {
    // command not found...
    // TODO: -
    return 44;
  }

  const packet = new Commands[commandId](args.targetSystem);
  packet._param1 = args.param1;
  packet._param2 = args.param2;
  packet._param3 = args.param3;
  packet._param4 = args.param4;
  packet._param5 = args.param5;
  packet._param6 = args.param6;
  packet._param7 = args.param7;

  return await send(port, packet, new MavLinkProtocolV2());
};

export default sendMavlinkCommandPacket;
