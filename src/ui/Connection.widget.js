import van from "vanjs-core";
import {
  TextNormal,
  TextBold,
  HorizontalLayout,
  VerticalLayout,
  BorderBox,
  Button,
  Input,
  VanComponentArgsParser,
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

import "./Connection.widget.css";

const { div } = van.tags;
const isAnimating = van.state(false);
const isClosed = van.state(false);

const ConnectionStatus = () =>
  VerticalLayout(
    {
      style: () =>
        "padding: 0.5em;flex:0;" +
        (lastServerError?.val ? "background-color:crimson;" : ""),
    },
    HorizontalLayout(
      TextNormal("Server is: "),
      TextBold({ style: "padding-left:1em;" }, () =>
        isServerConnected?.val ? "connected" : "disconnected"
      )
    ),
    HorizontalLayout(
      TextNormal("Device is: "),
      TextBold({ style: "padding-left:1em;" }, () =>
        isConnected?.val ? "connected" : "disconnected"
      )
    )
  );

//
const WidgetOpen = () =>
  VerticalLayout(
    { style: "height:100%;" },
    ConnectionStatus(),
    VerticalLayout(
      HorizontalLayout(
        { style: "flex:0;display: flex;justify-content: space-evenly;" },
        Button(
          {
            style: "min-width:0;max-width: 7em;",
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
          style: "min-width:0;max-width: 7em;",
          onclick: (e) => {
            e.stopPropagation();
            e.preventDefault();
          },
          onkeyup: (e) => {
            const { value = "" } = e?.target || {};
            setDevicePath(value);
          },
        })
      ),
      TextNormal(
        {
          style:
            "flex: 1;display: flex;align-items: center;padding-left: 0.5em;",
        },
        () => "Message: " + (lastServerMessage?.val || "None")
      ),
      TextNormal(
        {
          style:
            "flex: 1;display: flex;align-items: center;padding-left: 0.5em;",
        },
        () => "Error: " + (lastServerError?.val || "None")
      )
    )
  );

const WidgetClose = () => ConnectionStatus();

//

export const ConnectionWidget = (...args) => {
  const { componentClass, childs, otherProps } = VanComponentArgsParser(
    ...args
  );

  const { ...props } = otherProps || {};

  const toggleWidget = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isAnimating.val) {
      return;
    }

    isAnimating.val = true;
    isClosed.val = !isClosed.val;

    setTimeout(() => {
      isAnimating.val = false;
    }, 500);
  };

  const className = () =>
    isClosed.val
      ? "connection_widget connection_widget_closed"
      : "connection_widget";

  return div(
    {
      class: className,
      onclick: toggleWidget,
    },
    BorderBox(() =>
      isAnimating.val || isClosed.val ? WidgetClose() : WidgetOpen()
    )
  );
};
