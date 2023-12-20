import "vanjs-core";
import { Button, Input, HorizontalLayout } from "../../components/index.js";
import {
  devicePath,
  setDevicePath,
  isConnected,
  openDevicePath,
  disconnectDevicePath,
} from "../../logic/index.js";

import "./index.css";

// TODO: - On error, reset the isConnected

export const DeviceConnectionSection = () =>
  HorizontalLayout(
    { class: "Home-Section" },
    Button({
      text: () => (isConnected.val ? "disconnect" : "connect to:"),
      style: "max-width:7em;",
      onclick: () => {
        isConnected.val ? disconnectDevicePath() : openDevicePath();
      },
    }),
    Input({
      value: devicePath,
      color: "secondary",
      style: "max-width:7em;margin-left:0.5em;",
      onkeyup: (e) => {
        const { value = "" } = e?.target || {};
        setDevicePath(value);
      },
    })
  );

export default DeviceConnectionSection;
