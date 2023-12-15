import van from "vanjs-core";
import Button from "../components/Button.js";
import Input from "../components/Input.js";

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
    -> Check device connection status
    -> Ask for device status
    -> Display device status
/**/

// Sections
const DeviceConnectionSection = () =>
  div(
    { class: "mavlinkui horizontal" },
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

const DeviceConnectionStatusSection = () =>
  div(
    { class: "mavlinkui horizontal", style: "flex: 2;" },
    span("Last Heartbeat : "),
    span(
      { style: "padding-left:1em;" },
      () => lastHeartBeat.val?.timestamp || "Not connected"
    )
  );
//

// Home (device connection and status)
export const Home = () => {
  return div(
    { class: "mavlinkui horizontal" },
    DeviceConnectionSection,
    DeviceConnectionStatusSection
  );
};

export default Home;
