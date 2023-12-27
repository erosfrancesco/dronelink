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
const CommandsModal = () => {
  const items = Object.keys(commandMap.val);

  return SelectionFiltrable({
    items,
    selected: selectedCommand,
    onSelected,
    ItemRender: ({ item }) => {
      const isSelected = selectedCommand?.val === item;

      return HorizontalLayout(
        {
          onclick: () => {
            selectedCommand.val = item;
          },
          style: () =>
            isSelected ? "background-color: green;" : "background-color: red;",
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
    },
  });
};
//

//
export const SendDeviceCommand = () => {
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
      commandModalOpen.val ? CommandsModal() : null,
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
