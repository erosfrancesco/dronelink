import van from "vanjs-core";
import {
  Button,
  Input,
  VerticalLayout,
  HorizontalLayout,
  StatusDisplay,
  SendDeviceCommand,
  TextNormal,
  TextBold,
  BorderBox,
  VanComponentArgsParser,
} from "../components/index.js";
import "./Command.widget.css";

import { lastCommandAck } from "../logic/index.js";

// import { CommandAck } from "../screens/Develop/mocks.js";
// const lastCommandAck = van.state(CommandAck);

const { div } = van.tags;
const isAnimating = van.state(false);
const isClosed = van.state(false);

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

const CommandResultsHelp = {
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

const ResultLabel = ({ result }) =>
  TextBold(
    {
      style: () =>
        "color:" +
        (result === Object.keys(CommandResultsHelp)[0] ? "green" : "crimson") +
        ";",
    },
    () => result
  );

const WidgetOpen = ({ onclick }) => {
  const {
    result,
    command,
    progress,
    resultParam2,
    targetSystem,
    targetComponent,
  } = lastCommandAck.val;

  const commandStatusVerbose = CommandResultsHelp[result];

  return VerticalLayout(
    {
      style: "width: 100%;height: 100%;",
    },
    SendDeviceCommand(),
    VerticalLayout(
      { onclick },
      StatusDisplay(
        TextNormal("Command: "),
        TextBold(() => command)
      ),
      StatusDisplay(TextNormal("Result: "), ResultLabel({ result })),
      TextNormal(
        { style: "display: flex;justify-content: center;padding: 1em;" },
        () => commandStatusVerbose
      ),
      StatusDisplay(
        TextNormal("Progress: "),
        TextBold(() => progress)
      ),
      StatusDisplay(
        TextNormal("Result param: "),
        TextBold(() => resultParam2)
      )
    )
  );
};

const WidgetClose = ({ onclick }) => {
  const { result, command } = lastCommandAck.val;
  return div(
    { onclick, style: "width: 100%;height: 100%;" },
    StatusDisplay(
      TextBold(() => command),
      ResultLabel({ result })
    )
  );
};

//
export const CommandWidget = (...args) => {
  const { componentClass, childs, otherProps } = VanComponentArgsParser(
    ...args
  );

  const { ...props } = otherProps || {};

  const toggleWidget = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isAnimating.val) {
      return;
    }

    isAnimating.val = true;
    isClosed.val = !isClosed.val;

    setTimeout(() => {
      isAnimating.val = false;
    }, 500);
  };

  const className = () =>
    isClosed.val ? "command_widget command_widget_closed" : "command_widget";

  return div(
    {
      class: className,
    },
    BorderBox(() =>
      isAnimating.val || isClosed.val
        ? WidgetClose({ onclick: toggleWidget })
        : WidgetOpen({ onclick: toggleWidget })
    )
  );
};
