import van from "vanjs-core";
import { Button, Input, HorizontalLayout } from "../../components/index.js";

import {
  devicePath,
  setDevicePath,
  isConnected,
  openDevicePath,
  disconnectDevicePath,
} from "./Home.logic.js";

// Sections
export const DeviceConnectionSection = () =>
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

export default DeviceConnectionSection;
