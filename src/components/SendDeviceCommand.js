import van from "vanjs-core";
import {
  Button,
  Input,
  VerticalLayout,
  HorizontalLayout,
  TextNormal,
  TextBold,
} from "../components/index.js";

import { commandMap, commandList, sendMavlinkCommand } from "../logic/index.js";

//
const sendCommandToDevice = () =>
  sendMavlinkCommand({
    command: "REQUEST_MESSAGE",
  });
//

export const SendDeviceCommand = () => {
  console.log(commandMap, commandList);

  return VerticalLayout(
    { style: "padding-bottom:0.5em;" },
    TextBold(
      { style: "display:flex;justify-content:center;padding-bottom:0.5em;" },
      "Device commands"
    ),
    HorizontalLayout(
      {
        style: "margin-right: -3em;width: calc(100% - 1em);padding-left: 1em;",
      },
      Input({
        style: "min-width:0;margin-right:0.5em;",
        value: "Command",
        color: "secondary",
        onkeyup: (e) => {
          e.preventDefault();
          e.stopPropagation();
          const { value = "" } = e?.target || {};
        },
      }),
      Button({
        style: "min-width:0;",
        text: "Send",
        onclick: (e) => {
          e.preventDefault();
          e.stopPropagation();
          sendCommandToDevice();
        },
      })
    )
  );
};
