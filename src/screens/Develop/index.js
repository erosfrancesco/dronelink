import van from "vanjs-core";
import {
  VerticalLayout,
  HorizontalLayout,
  FlagsDisplay,
  StatusDisplay,
} from "../../components/index.js";

import { HeartbeatWidget } from "../../ui/Heartbeat.widget.js";

import DeviceCommands from "./DeviceCommands.js";

import { Heartbeat } from "./mocks.js";
const isConnected = { val: true };

const { div, span } = van.tags;

export const Develop = () => {
  const { autopilot, baseMode, systemStatus, timestamp, type } =
    Heartbeat || {};

  const values = {
    "Last Heartbeat": timestamp,
    System: autopilot,
    Device: type,
    Status: systemStatus,
  };

  return HeartbeatWidget({ Heartbeat: values });

  /*
  return VerticalLayout({ class: "Home-Section" }, () =>
    isConnected.val
      ? div(
          StatusDisplay({ values, minWidth: "10em" }),
          FlagsDisplay({ flags: baseMode, style: "padding-left:1em;" }),
          DeviceCommands()
        )
      : span("Not connected")
  );
  /** */
};
//

export default Develop;
