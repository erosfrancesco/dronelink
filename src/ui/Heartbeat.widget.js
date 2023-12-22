import van from "vanjs-core";
import VanComponentArgsParser from "../components/utils.js";
import { HexagonBox } from "../components/HexagonBox.js";
import { TextNormal } from "../components/index.js";

import "./Heartbeat.widget.css";

const { div, span } = van.tags;

const isAnimating = van.state(false);
const isClosed = van.state(false);

export const HeartbeatWidget = (...args) => {
  const { componentClass, childs, otherProps } = VanComponentArgsParser(
    ...args
  );

  const { Heartbeat, ...props } = otherProps || {};
  console.log(Heartbeat);

  const toggleWidget = () => {
    isAnimating.val = true;
    isClosed.val = !isClosed.val;

    setTimeout(() => {
      isAnimating.val = false;
    }, 500);
  };

  const className = () =>
    isClosed.val
      ? "heartbeat_widget heartbeat_widget_closed"
      : "heartbeat_widget";

  return div(
    {
      class: className,
      onclick: toggleWidget,
    },
    HexagonBox(() =>
      isAnimating.val || isClosed.val
        ? TextNormal("Clicked")
        : TextNormal("Click me")
    )
  );
};
