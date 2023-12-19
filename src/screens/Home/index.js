import van from "vanjs-core";
import { Button, Input, HorizontalLayout } from "../../components/index.js";

// import "./Home.logic.js";

import DeviceConnectionSection from "./DeviceConnection.js";
import DeviceConnectionStatusSection from "./DeviceConnectionStatus.js";

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
    HorizontalLayout(DeviceConnectionSection, DeviceConnectionStatusSection)
    // HorizontalLayout(DeviceCommandSection)
  );

export default Home;
