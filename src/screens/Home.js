import van from "vanjs-core";
import Button from "../components/Button.js";
import Input from "../components/Input.js";

import {
  devicePath,
  setDevicePath,
  isConnected,
  openDevicePath,
  disconnectDevicePath,
} from "./Home.logic.js";

const { div } = van.tags;

/* So far:
TODO: - 
  A connection to the ws is executed at app start.
    -> Check the connection status
  User connect to device
    -> Check device connection status
    -> Ask for device status
    -> Display device status
/**/

// Sections
const DeviceConnectionSection = () => {
  return div(
    { class: "mavlinkui", style: "flex-direction: row;" },
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
};
//

// Home (device connection and status)
export const Home = () => {
  return div(DeviceConnectionSection);
};

export default Home;
