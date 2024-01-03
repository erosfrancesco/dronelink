import van from "vanjs-core";
import {
  VerticalLayout,
  StatusDisplay,
  TextNormal,
  TextBold,
  WidgetBorders,
  VanComponentArgsParser,
} from "../components/index.js";
import "./CommandResult.widget.css";

import {
  mavlinkClasses,
  mavlinkPackets,
  event,
  MAVLINK_PACKET_RECEIVED,
  CommandResultsHelp,
  commandMap,
} from "../logic/index.js";

const { div } = van.tags;
const isAnimating = van.state(false);
const isClosed = van.state(false);

const ResultLabel = ({ result, label }) =>
  TextBold(
    {
      class:
        result === Object.keys(CommandResultsHelp)[0]
          ? "command_result_accepted"
          : "command_result_rejected",
    },
    () => label
  );

const WidgetOpen = ({ lastReceivedPacket }) => {
  const {
    result,
    command,
    progress,
    resultParam2,
    targetSystem,
    targetComponent,
  } = lastReceivedPacket || {};

  const commandStatusVerbose = CommandResultsHelp[result];

  return VerticalLayout(
    {
      class: "command_widget_content",
    },
    VerticalLayout(
      TextBold(
        {
          style: "margin-bottom: 1em;",
        },
        "Command Result"
      ),

      () =>
        !command
          ? TextNormal("No command response yet.")
          : VerticalLayout(
              StatusDisplay(
                TextNormal("Command: "),
                TextBold(() => command)
              ),
              StatusDisplay(
                TextNormal("Result: "),
                ResultLabel({ result, label: result })
              ),
              TextNormal(
                { class: "command_result_description" },
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
    )
  );
};

const WidgetClose = ({ lastReceivedPacket }) => {
  const { result, command } = lastReceivedPacket || {};

  return div(
    { class: "command_widget_content" },
    lastReceivedPacket
      ? ResultLabel({ result, label: "Command Result" })
      : TextBold("Command Result")
  );
};

//
export const CommandResultWidget = (...args) => {
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

  const packetType = mavlinkClasses.val?.COMMAND_ACK;
  const data = van.state(mavlinkPackets[packetType] || {});
  if (packetType) {
    event.on(MAVLINK_PACKET_RECEIVED + "-" + packetType, (e) => {
      data.val = e;
    });
  }

  return WidgetBorders(
    div(
      {
        class: className,
        onclick: toggleWidget,
      },
      () =>
        isAnimating.val || isClosed.val
          ? WidgetClose({
              ...data.val,
            })
          : WidgetOpen({
              ...data.val,
            })
    )
  );
};
