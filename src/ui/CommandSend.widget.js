import van from "vanjs-core";
import {
  Button,
  VerticalLayout,
  HorizontalLayout,
  TextNormal,
  TextBold,
  FiltrableSelection,
  WidgetBorders,
} from "../components/index.js";

import { commandMap, commandList, sendMavlinkCommand } from "../logic/index.js";
import "./CommandSend.widget.css";

// TODO: - Three section: 
// x Command list popup, 
// x command result and 
// (command parameters form)

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
  FiltrableSelection({
    class: "device-commands-modal",
    items: Object.keys(commandMap.val),
    selected: selectedCommand,
    onSelected,
    onCloseClicked: toggleCommandModal,
    ItemRender: DeviceCommandItem,
  });
//

//
export const CommandSendWidget = () => {
  // TODO: - Check command list
  return WidgetBorders(
    VerticalLayout(
      {
        class: "send-command-wrapper",
      },
      TextBold({ class: "send-command-title" }, "Send command"),
      HorizontalLayout(
        commandModalOpen.val ? DeviceCommandsModal() : null,
        Button(
          {
            onclick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleCommandModal();
            },
          },
          "Select command"
        )
      )
    )
  );
};
