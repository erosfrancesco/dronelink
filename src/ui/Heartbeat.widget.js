import van from "vanjs-core";
import {
  TextBold,
  HorizontalLayout,
  VerticalLayout,
  FlagsDisplay,
  BorderBox,
  StatusDisplay,
  VanComponentArgsParser,
} from "../components/index.js";

import { isConnected, mavlinkPackets } from "../logic/index.js";

import "./Heartbeat.widget.css";

const { div } = van.tags;

const isAnimating = van.state(false);
const isClosed = van.state(false);
// text-shadow: -1px -1px 0 rgba(255, 255, 255, 0.5), 1px -1px 0 rgba(255, 255, 255, 0.5), -1px 1px 0 rgba(255, 255, 255, 0.5), 1px 1px 0 rgba(255, 255, 255, 0.5)

const WidgetOpen = () => {
  const { lastReceivedPacket, receivedOn } =
    mavlinkPackets["HEARTBEAT"]?.val || {};
  const { type, autopilot, systemStatus, baseMode } = lastReceivedPacket || {};

  return VerticalLayout(
    { style: "padding: 0.5em;" },
    StatusDisplay(
      TextBold("Last Heartbeat :"),
      TextBold(() => (isConnected?.val ? receivedOn?.val : "Not connected"))
    ),

    () =>
      isConnected?.val
        ? VerticalLayout(
            StatusDisplay(TextBold("Device type:"), TextBold(type)),
            StatusDisplay(TextBold("System:"), TextBold(autopilot)),
            StatusDisplay(TextBold("Status:"), TextBold(systemStatus)),

            StatusDisplay(
              TextBold("Mode: "),
              FlagsDisplay({ flags: baseMode, style: "padding-left:1em;" })
            )
          )
        : null
  );
};

const WidgetClose = () => {
  const { receivedOn } = mavlinkPackets["HEARTBEAT"]?.val || {};
  // const { type, autopilot, systemStatus, baseMode } = lastReceivedPacket?.val;

  return HorizontalLayout(
    { style: "justify-content: space-evenly;width: 100%;height: 100%;" },
    TextBold("Last Heartbeat : "),
    TextBold(() => (isConnected?.val ? receivedOn?.val : "Not connected"))
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

  return div(
    {
      class: className,
      onclick: toggleWidget,
    },
    BorderBox(() =>
      isAnimating.val || isClosed.val || !isConnected?.val
        ? WidgetClose()
        : WidgetOpen()
    )
  );
};
