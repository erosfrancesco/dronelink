import van from "vanjs-core";
import "./CommandSend.widget.css";

import {
  Button,
  Input,
  VerticalLayout,
  HorizontalLayout,
  TextNormal,
  TextBold,
  FiltrableSelection,
  WidgetBorders,
} from "../components/index.js";

import {
  commandMap,
  commandList,
  sendMavlinkCommand,
  commandModalOpen,
  toggleCommandModal,
  selectedCommand,
  setSelectedCommand,
  param1,
  setParam1,
  param2,
  setParam2,
  param3,
  setParam3,
  param4,
  setParam4,
  param5,
  setParam5,
  param6,
  setParam6,
  param7,
  setParam7,
} from "../logic/index.js";

//
const onSelected = (value) => setSelectedCommand(value);

const sendCommand = () =>
  sendMavlinkCommand({
    command: selectedCommand.val,
    param1,
    param2,
    param3,
    param4,
    param5,
    param6,
    param7,
  });
//

//
const DeviceCommandItem = ({ item }) => {
  const isSelected = selectedCommand?.val === item;

  return HorizontalLayout(
    {
      onclick: () => onSelected(item),
      class:
        "device-command-item" +
        (isSelected ? " device-command-item-selected" : ""),
    },
    TextNormal(item)
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

const NoCommandsAvailable = () => TextNormal("Command list not availble");

//
export const CommandSendWidget = () =>
  WidgetBorders(
    !commandList.val.length
      ? NoCommandsAvailable()
      : VerticalLayout(
          {
            class: "send-command-wrapper",
          },
          TextBold({ class: "send-command-title" }, "Send command"),

          commandModalOpen.val ? DeviceCommandsModal() : null,
          Button(
            {
              class: "send-command-select",
              onclick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleCommandModal();
              },
            },
            "Select command"
          ),

          selectedCommand.val
            ? VerticalLayout(
                TextNormal(selectedCommand.val),
                Button(
                  {
                    color: "secondary",
                    onclick: sendCommand,
                    class: "send-command-send",
                  },
                  "Send"
                ),
                VerticalLayout(
                  { class: "send-command-parameter-wrapper" },
                  TextNormal("Param1"),
                  Input({
                    value: param1,
                    onclick: (e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    },
                    onkeyup: (e) => {
                      const { value = "" } = e?.target || {};
                      setParam1(value);
                    },
                  })
                ),
                VerticalLayout(
                  { class: "send-command-parameter-wrapper" },
                  TextNormal("Param2"),
                  Input({
                    value: param2,
                    onclick: (e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    },
                    onkeyup: (e) => {
                      const { value = "" } = e?.target || {};
                      setParam2(value);
                    },
                  })
                ),
                VerticalLayout(
                  { class: "send-command-parameter-wrapper" },
                  TextNormal("Param3"),
                  Input({
                    value: param3,
                    onclick: (e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    },
                    onkeyup: (e) => {
                      const { value = "" } = e?.target || {};
                      setParam3(value);
                    },
                  })
                ),
                VerticalLayout(
                  { class: "send-command-parameter-wrapper" },
                  TextNormal("Param4"),
                  Input({
                    value: param4,
                    onclick: (e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    },
                    onkeyup: (e) => {
                      const { value = "" } = e?.target || {};
                      setParam4(value);
                    },
                  })
                ),
                VerticalLayout(
                  { class: "send-command-parameter-wrapper" },
                  TextNormal("Param5"),
                  Input({
                    value: param5,
                    onclick: (e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    },
                    onkeyup: (e) => {
                      const { value = "" } = e?.target || {};
                      setParam5(value);
                    },
                  })
                ),
                VerticalLayout(
                  { class: "send-command-parameter-wrapper" },
                  TextNormal("Param6"),
                  Input({
                    value: param6,
                    onclick: (e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    },
                    onkeyup: (e) => {
                      const { value = "" } = e?.target || {};
                      setParam6(value);
                    },
                  })
                ),
                VerticalLayout(
                  { class: "send-command-parameter-wrapper" },
                  TextNormal("Param7"),
                  Input({
                    value: param7,
                    onclick: (e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    },
                    onkeyup: (e) => {
                      const { value = "" } = e?.target || {};
                      setParam7(value);
                    },
                  })
                )
              )
            : null
        )
  );
