import van from "vanjs-core";
import {
  TextNormal,
  TextBold,
  HorizontalLayout,
  VerticalLayout,
  FlagsDisplay,
  BorderBox,
  StatusDisplay,
  VanComponentArgsParser,
} from "../components/index.js";

import "./Connection.widget.css";

const { div } = van.tags;

const isAnimating = van.state(false);
const isClosed = van.state(false);

//
const WidgetOpen = ({}) => VerticalLayout();

const WidgetClose = ({}) => HorizontalLayout();
//

export const ConnectionWidget = (...args) => {
  const { componentClass, childs, otherProps } = VanComponentArgsParser(
    ...args
  );

  const { ...props } = otherProps || {};

  const toggleWidget = () => {
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
      isAnimating.val || isClosed.val ? WidgetClose({}) : WidgetOpen({})
    )
  );
};
