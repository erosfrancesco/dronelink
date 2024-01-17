import van from "vanjs-core";
import { COMMANDLIST_RECEIVED, event, wsSend } from "../client/index.js";
import { sendMavlinkPacketCommand } from "../../messages.js";

// {value: '16', flag: 'NAV_WAYPOINT'}
export const commandList = van.state([]);
export const setCommandList = (value) => (commandList.val = value);

// { NAV_WAYPOINT: '16' }
export const commandMap = van.state({});
export const setCommandMap = (value) => (commandMap.val = value);

// SEND COMMAND LOGIC
export const commandModalOpen = van.state(false);
export const selectedCommand = van.state();
export const setSelectedCommand = (v) => (selectedCommand.val = v);
export const toggleCommandModal = () =>
  (commandModalOpen.val = !commandModalOpen.val);

export const param1 = van.state();
export const setParam1 = (v) => (param1.val = v);
export const param2 = van.state();
export const setParam2 = (v) => (param2.val = v);
export const param3 = van.state();
export const setParam3 = (v) => (param3.val = v);
export const param4 = van.state();
export const setParam4 = (v) => (param4.val = v);
export const param5 = van.state();
export const setParam5 = (v) => (param5.val = v);
export const param6 = van.state();
export const setParam6 = (v) => (param6.val = v);
export const param7 = van.state();
export const setParam7 = (v) => (param7.val = v);
//

// EVENTS
event.on(COMMANDLIST_RECEIVED, (e) => {
  const { commandList, commandMap } = e;
  setCommandList(commandList);
  setCommandMap(commandMap);
});
//

export const CommandResultsHelp = {
  ACCEPTED:
    "Command is valid (is supported and has valid parameters), and was executed.",
  TEMPORARILY_REJECTED:
    "Command is valid, but cannot be executed at this time. This is used to indicate a problem that should be fixed just by waiting (e.g. a state machine is busy, can't arm because have not got GPS lock, etc.). Retrying later should work.",
  DENIED:
    "Command is invalid (is supported but has invalid parameters). Retrying same command and parameters will not work.",
  UNSUPPORTED: "Command is not supported (unknown).",
  FAILED:
    "Command is valid, but execution has failed. This is used to indicate any non-temporary or unexpected problem, i.e. any problem that must be fixed before the command can succeed/be retried. For example, attempting to write a file when out of memory, attempting to arm when sensors are not calibrated, etc.",
  IN_PROGRESS:
    "Command is valid and is being executed. This will be followed by further progress updates, i.e. the component may send further COMMAND_ACK messages with result MAV_RESULT_IN_PROGRESS (at a rate decided by the implementation), and must terminate by sending a COMMAND_ACK message with final result of the operation. The COMMAND_ACK.progress field can be used to indicate the progress of the operation.",
  CANCELLED:
    "Command has been cancelled (as a result of receiving a COMMAND_CANCEL message).",
  COMMAND_LONG_ONLY: "Command is only accepted when sent as a COMMAND_LONG.",
  COMMAND_INT_ONLY: "Command is only accepted when sent as a COMMAND_INT.",
  COMMAND_UNSUPPORTED_MAV_FRAME:
    "Command is invalid because a frame is required and the specified frame is not supported.",
};

//
export const sendMavlinkCommand = ({ command, ...args }) => {
  wsSend(
    sendMavlinkPacketCommand({
      command: command || "REQUEST_MESSAGE",
      ...args,
    })
  );
};
