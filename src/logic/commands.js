/**
  0	MAV_RESULT_ACCEPTED	Command is valid (is supported and has valid parameters), and was executed.
  1	MAV_RESULT_TEMPORARILY_REJECTED	Command is valid, but cannot be executed at this time. This is used to indicate a problem that should be fixed just by waiting (e.g. a state machine is busy, can't arm because have not got GPS lock, etc.). Retrying later should work.
  2	MAV_RESULT_DENIED	Command is invalid (is supported but has invalid parameters). Retrying same command and parameters will not work.
  3	MAV_RESULT_UNSUPPORTED	Command is not supported (unknown).
  4	MAV_RESULT_FAILED	Command is valid, but execution has failed. This is used to indicate any non-temporary or unexpected problem, i.e. any problem that must be fixed before the command can succeed/be retried. For example, attempting to write a file when out of memory, attempting to arm when sensors are not calibrated, etc.
  5	MAV_RESULT_IN_PROGRESS	Command is valid and is being executed. This will be followed by further progress updates, i.e. the component may send further COMMAND_ACK messages with result MAV_RESULT_IN_PROGRESS (at a rate decided by the implementation), and must terminate by sending a COMMAND_ACK message with final result of the operation. The COMMAND_ACK.progress field can be used to indicate the progress of the operation.
  6	MAV_RESULT_CANCELLED	Command has been cancelled (as a result of receiving a COMMAND_CANCEL message).
  7	MAV_RESULT_COMMAND_LONG_ONLY	Command is only accepted when sent as a COMMAND_LONG.
  8	MAV_RESULT_COMMAND_INT_ONLY	Command is only accepted when sent as a COMMAND_INT.
  9	MAV_RESULT_COMMAND_UNSUPPORTED_MAV_FRAME	Command is invalid because a frame is required and the specified frame is not supported.
 */
import van from "vanjs-core";
import { COMMANDLIST_RECEIVED, event, wsSend } from "../client.js";
import { sendMavlinkPacketCommand } from "../../messages.js";

// {value: '16', flag: 'NAV_WAYPOINT'}
export const commandList = van.state([]);
export const setCommandList = (value) => (commandList.val = value);

// { NAV_WAYPOINT: '16' }
export const commandMap = van.state({});
export const setCommandMap = (value) => (commandMap.val = value);

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
      command: command || "RequestMessageCommand",
      ...args,
    })
  );
};
