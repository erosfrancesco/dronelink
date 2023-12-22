import van from "vanjs-core";
import VanComponentArgsParser from "../components/utils.js";

import {
  TextNormal,
  TextBold,
  HorizontalLayout,
  VerticalLayout,
  FlagsDisplay,
  BorderBox,
} from "../components/index.js";

import "./Heartbeat.widget.css";

const { div, span } = van.tags;

const isAnimating = van.state(false);
const isClosed = van.state(false);
// text-shadow: -1px -1px 0 rgba(255, 255, 255, 0.5), 1px -1px 0 rgba(255, 255, 255, 0.5), -1px 1px 0 rgba(255, 255, 255, 0.5), 1px 1px 0 rgba(255, 255, 255, 0.5)

const StatusDisplay = (...childs) =>
  HorizontalLayout(
    {
      style: "justify-content: space-between;width: 100%;height: 100%;",
    },
    ...childs
  );

const WidgetOpen = ({
  isConnected,
  timestamp,
  type,
  autopilot,
  systemStatus,
  baseMode,
}) =>
  VerticalLayout(
    { style: "padding: 0.5em;" },
    StatusDisplay(
      TextBold("Last Heartbeat :"),
      TextBold(() => (isConnected.val ? timestamp : "Not connected"))
    ),

    () =>
      isConnected.val
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

const WidgetClose = ({
  isConnected,
  timestamp,
  type,
  autopilot,
  systemStatus,
  baseMode,
}) =>
  HorizontalLayout(
    { style: "justify-content: space-evenly;width: 100%;height: 100%;" },
    TextBold("Last Heartbeat : "),
    TextBold(() => (isConnected.val ? timestamp : "Not connected"))
  );

export const HeartbeatWidget = (...args) => {
  const { componentClass, childs, otherProps } = VanComponentArgsParser(
    ...args
  );

  const { Heartbeat, isConnected, ...props } = otherProps || {};

  if (!isConnected.val) {
    isClosed.val = true;
  }

  const toggleWidget = () => {
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
    isClosed.val
      ? "heartbeat_widget heartbeat_widget_closed"
      : "heartbeat_widget";

  return div(
    {
      class: className,
      onclick: toggleWidget,
    },
    BorderBox(() =>
      isAnimating.val || isClosed.val
        ? WidgetClose({ ...Heartbeat, isConnected })
        : WidgetOpen({ ...Heartbeat, isConnected })
    )
  );
};
