import "vanjs-core";
import "./Connection.widget.css";

import {
  TextNormal,
  TextBold,
  HorizontalLayout,
  VerticalLayout,
  Button,
  Input,
} from "../components/index.js";

import {
  disconnectDevicePath,
  openDevicePath,
  devicePath,
  setDevicePath,
  isConnected,
  isServerConnected,
  lastServerError,
  lastServerMessage,
} from "../logic/index.js";

import { ResizableWidget } from "./ResizableWidget.js";


const ConnectionStatus = () =>
  VerticalLayout(
    {
      class: () =>
        "connection_status_wrapper" +
        (lastServerError?.val ? " connection_status_wrapper_error" : ""),
    },
    HorizontalLayout(
      { class: "connection_status_text_wrapper" },
      TextNormal("Server is: "),
      TextBold(() => (isServerConnected?.val ? "connected" : "disconnected"))
    ),
    HorizontalLayout(
      { class: "connection_status_text_wrapper" },
      TextNormal("Device is: "),
      TextBold(() => (isConnected?.val ? "connected" : "disconnected"))
    )
  );

const WidgetOpenInputs = () =>
  HorizontalLayout(
    { class: "conenction_widget_inputs_wrapper" },
    Button(
      {
        class: "connection_widget_inputs",
        onclick: (e) => {
          e.stopPropagation();
          e.preventDefault();
          isConnected.val ? disconnectDevicePath() : openDevicePath();
        },
      },
      () => (isConnected.val ? "disconnect" : "connect")
    ),
    Input({
      value: devicePath,
      color: "secondary",
      class: "connection_widget_inputs",
      onclick: (e) => {
        e.stopPropagation();
        e.preventDefault();
      },
      onkeyup: (e) => {
        const { value = "" } = e?.target || {};
        setDevicePath(value);
      },
    })
  );

//
const WidgetOpen = () =>
  VerticalLayout(
    ConnectionStatus(),
    VerticalLayout(
      WidgetOpenInputs(),
      TextNormal(
        { class: "connection_widget_messages" },
        () => "Message: " + (lastServerMessage?.val || "None")
      ),
      TextNormal(
        { class: "connection_widget_messages" },
        () => "Error: " + (lastServerError?.val || "None")
      )
    )
  );

const WidgetClose = () => ConnectionStatus();

//

export const ConnectionWidget = () =>
  ResizableWidget({
    WidgetClose,
    WidgetOpen,
    classClose: "connection_widget_closed",
    classOpen: "connection_widget",
  });
