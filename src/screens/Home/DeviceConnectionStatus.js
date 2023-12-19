import van from "vanjs-core";
import {
  FlagsDisplay,
  HorizontalLayout,
  VerticalLayout,
} from "../../components/index.js";

import { isConnected, lastHeartBeat } from "./Home.logic.js";

const { div, span } = van.tags;

export const DeviceConnectionStatusSection = () => {
  const { autopilot, baseMode, systemStatus, timestamp, type } =
    lastHeartBeat.val || {};

  return VerticalLayout(
    HorizontalLayout(
      span("Last Heartbeat : "),
      span({ style: "padding-left:1em;" }, () =>
        isConnected.val ? timestamp : "Not connected"
      )
    ),
    () =>
      isConnected.val
        ? VerticalLayout(
            span(() => "Device type: " + type),
            span(() => "System: " + autopilot),
            span(() => "Status: " + systemStatus),
            span("Mode: "),
            FlagsDisplay({ flags: baseMode, style: "padding-left:1em;" })
          )
        : null
  );
};

export default DeviceConnectionStatusSection;
