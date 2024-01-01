import van from "vanjs-core";
import {
  Button,
  VerticalLayout,
  HorizontalLayout,
  TextNormal,
  TextBold,
  SelectionFiltrable,
} from "../components/index.js";

import { commandMap, commandList, sendMavlinkCommand } from "../logic/index.js";
import "./DeviceCommands.css";

// TODO: - Params form?
// TODO: - Command section. This can't be a single widget

//
const commandModalOpen = van.state(false);
const toggleCommandModal = () => {
  commandModalOpen.val = !commandModalOpen.val;
};
const selectedCommand = van.state();
const onSelected = (value) => {
  selectedCommand.val = value;
};
//

//
const DeviceCommandItem = ({ item }) => {
  const isSelected = selectedCommand?.val === item;

  return HorizontalLayout(
    {
      onclick: () => {
        selectedCommand.val = item;
      },
      class:
        "device-command-item" +
        (isSelected ? " device-command-item-selected" : ""),
    },
    TextNormal({ style: "flex: 2;" }, item),
    isSelected
      ? Button(
          {
            style: "margin:0;",
            onclick: () =>
              sendMavlinkCommand({
                command: item,
              }),
          },
          "Execute"
        )
      : null
  );
};
//

//
const DeviceCommandsModal = () =>
  SelectionFiltrable({
    class: "device-commands-modal",
    items: Object.keys(commandMap.val),
    selected: selectedCommand,
    onSelected,
    ItemRender: DeviceCommandItem,
  });
//

//
export const DeviceCommands = () => {
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
      commandModalOpen.val ? DeviceCommandsModal() : null,
      Button(
        {
          style: "min-width:0;",

          onclick: (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleCommandModal();
          },
        },
        () => (commandModalOpen.val ? "Close" : "Open")
      )
    )
  );
};

export default DeviceCommands;
