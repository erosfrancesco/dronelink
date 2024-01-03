import van from "vanjs-core";
import {
  TextBold,
  HorizontalLayout,
  VerticalLayout,
  FlagsDisplay,
  WidgetBorders,
  StatusDisplay,
  VanComponentArgsParser,
} from "../components/index.js";

import {
  isConnected,
  mavlinkClasses,
  mavlinkPackets,
  MAVLINK_PACKET_RECEIVED,
  event,
} from "../logic/index.js";

import "./Heartbeat.widget.css";

const { div } = van.tags;

const isAnimating = van.state(false);
const isClosed = van.state(false);

const WidgetOpen = ({ lastReceivedPacket, receivedOn }) => {
  const { type, autopilot, systemStatus, baseMode } = lastReceivedPacket || {};

  return VerticalLayout(
    StatusDisplay(
      TextBold("Last Heartbeat :"),
      TextBold(() => (isConnected?.val ? receivedOn : "Not connected"))
    ),

    () =>
      isConnected?.val
        ? VerticalLayout(
            StatusDisplay(TextBold("Device type:"), TextBold(type)),
            StatusDisplay(TextBold("System:"), TextBold(autopilot)),
            StatusDisplay(TextBold("Status:"), TextBold(systemStatus)),

            StatusDisplay(
              TextBold("Mode: "),
              FlagsDisplay({
                flags: baseMode,
                style: "padding-left:1em; margin-top: 1em;",
              })
            )
          )
        : null
  );
};

const WidgetClose = ({ receivedOn }) => {
  return HorizontalLayout(
    { style: "justify-content: space-evenly;width: 100%;height: 100%;" },
    TextBold("Last Heartbeat : "),
    TextBold(() => (isConnected?.val ? receivedOn : "Not connected"))
  );
};

export const HeartbeatWidget = (...args) => {
  const { componentClass, childs, otherProps } = VanComponentArgsParser(
    ...args
  );

  const toggleWidget = () => {
    if (!isConnected?.val) {
      return;
    }

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
    isClosed.val || !isConnected?.val
      ? "heartbeat_widget heartbeat_widget_closed"
      : "heartbeat_widget";

  const packetType = mavlinkClasses.val?.HEARTBEAT;
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
        isAnimating.val || isClosed.val || !isConnected?.val
          ? WidgetClose({ ...data.val })
          : WidgetOpen({ ...data.val })
    )
  );
  // });
};
