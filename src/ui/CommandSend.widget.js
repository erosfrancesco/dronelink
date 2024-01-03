import van from "vanjs-core";
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

import { commandMap, commandList, sendMavlinkCommand } from "../logic/index.js";
import "./CommandSend.widget.css";

// TODO: - Set the logic

//
const commandModalOpen = van.state(false);
const selectedCommand = van.state();
const setSelectedCommand = (v) => (selectedCommand.val = v);

const param1 = van.state();
const setParam1 = (v) => (param1.val = v);
const param2 = van.state();
const setParam2 = (v) => (param2.val = v);
const param3 = van.state();
const setParam3 = (v) => (param3.val = v);
const param4 = van.state();
const setParam4 = (v) => (param4.val = v);
const param5 = van.state();
const setParam5 = (v) => (param5.val = v);
const param6 = van.state();
const setParam6 = (v) => (param6.val = v);
const param7 = van.state();
const setParam7 = (v) => (param7.val = v);
//

//
const toggleCommandModal = () => (commandModalOpen.val = !commandModalOpen.val);
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
              class: 'send-command-select',
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
                Button({ color: "secondary", onclick: sendCommand, class: 'send-command-send' }, "Send"),
                VerticalLayout(
                  { class: 'send-command-parameter-wrapper' },
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
                  { class: 'send-command-parameter-wrapper' },
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
                  { class: 'send-command-parameter-wrapper' },
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
                  { class: 'send-command-parameter-wrapper' },
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
                  { class: 'send-command-parameter-wrapper' },
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
                  { class: 'send-command-parameter-wrapper' },
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
                  { class: 'send-command-parameter-wrapper' },
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
