import van from "vanjs-core";
import {
  VerticalLayout,
  DisplayStatus,
  TextNormal,
  TextBold,
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

import { ResizableWidget } from "./ResizableWidget.js";

const { div } = van.tags;

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
              DisplayStatus(TextBold(() => command)),
              DisplayStatus(
                TextNormal("Result: "),
                ResultLabel({ result, label: result })
              ),
              TextNormal(
                { class: "command_result_description" },
                () => commandStatusVerbose
              ),
              DisplayStatus(
                TextNormal("Progress: "),
                TextBold(() => progress)
              ),
              DisplayStatus(
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
export const CommandResultWidget = () => {
  const packetType = mavlinkClasses.val?.COMMAND_ACK;
  const data = van.state(mavlinkPackets[packetType] || {});
  if (packetType) {
    event.on(MAVLINK_PACKET_RECEIVED + "-" + packetType, (e) => {
      data.val = e;
    });
  }

  return ResizableWidget({
    WidgetClose: () =>
      WidgetClose({
        ...data.val,
      }),
    WidgetOpen: () =>
      WidgetOpen({
        ...data.val,
      }),
    classOpen: "command_widget",
    classClose: "command_widget_closed",
  });
};
