import "vanjs-core";
import { Button, Input, HorizontalLayout } from "../../components/index.js";
import {
  devicePath,
  setDevicePath,
  isConnected,
  openDevicePath,
  disconnectDevicePath,
} from "./logic.js";

import "./index.css";

// TODO: - Display connection errors

export const DeviceConnectionSection = () =>
  HorizontalLayout(
    { class: "Home-Section" },
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
      style: "max-width: 7em;margin-left:0.5em;",
      onkeyup: (e) => {
        const { value = "" } = e?.target || {};
        setDevicePath(value);
      },
    })
  );

export default DeviceConnectionSection;
