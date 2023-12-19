import van from "vanjs-core";
import {
  Button,
  Input,
  FlagsDisplay,
  HorizontalLayout,
} from "../components/index.js";

import {
  devicePath,
  setDevicePath,
  isConnected,
  lastHeartBeat,
  openDevicePath,
  disconnectDevicePath,
} from "./Home.logic.js";

const { div, span } = van.tags;

/* So far:
TODO: - 
  User connect to device
    -> Check device connection status x
    -> Ask for device status x
    -> Display device status x
    -> Display Flags with some proper component <-

/**/

// Sections
const DeviceConnectionSection = () =>
  HorizontalLayout(
    Button({
      text: () => (isConnected.val ? "disconnect" : "connect to:"),
      style: "max-width: 7em;",
      onclick: () => {
        isConnected.val ? disconnectDevicePath() : openDevicePath();
      },
    }),
    Input({
      value: devicePath,
      color: "secondary",
      style: "max-width: 7em;",
      onkeyup: (e) => {
        const { value = "" } = e?.target || {};
        setDevicePath(value);
      },
    })
  );

const DeviceConnectionStatusSection = () => {
  const { autopilot, baseMode, systemStatus, timestamp, type } =
    lastHeartBeat.val || {};

  return HorizontalLayout(
    { style: "flex: 2;" },
    span("Last Heartbeat : "),
    span({ style: "padding-left:1em;" }, () =>
      isConnected.val ? timestamp : "Not connected"
    ),
    () =>
      isConnected.val
        ? HorizontalLayout(
            span(() => "Device type: " + type),
            span(() => "System: " + autopilot),
            span(() => "Status: " + systemStatus),
            span(() => "Mode: "),
            FlagsDisplay({ flags: baseMode })
          )
        : null
  );
};

const DeviceCommandSection = () =>
  div(
    Input({
      value: "Command",
      color: "secondary",
      onkeyup: (e) => {
        const { value = "" } = e?.target || {};
      },
    }),
    Button({
      text: "Send command",
      onclick: () => {
        console.log("Not implemented yet");
      },
    })
  );
//

// Home Screen
export const Home = () =>
  div(
    HorizontalLayout(DeviceConnectionSection, DeviceConnectionStatusSection),
    HorizontalLayout(DeviceCommandSection)
  );

export default Home;
