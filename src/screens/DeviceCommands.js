import van from "vanjs-core";
import { Button, Input, VerticalLayout } from "../components/index.js";

const { div, span } = van.tags;

export const DeviceCommands = () =>
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

export default DeviceCommands;
