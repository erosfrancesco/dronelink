import van from "vanjs-core";
import VanComponentArgsParser from "./utils.js";
import "./Layout.css";

const { div, span } = van.tags;

export const HorizontalLayout = (...args) => {
  const { componentClass, childs, otherProps } = VanComponentArgsParser(
    ...args
  );

  return div(
    {
      class:
        "mavlinkui horizontal" + (componentClass ? " " + componentClass : ""),
      ...otherProps,
    },
    ...childs
  );
};

export const VerticalLayout = (...args) => {
  const { componentClass, childs, otherProps } = VanComponentArgsParser(
    ...args
  );

  return div(
    {
      class: () =>
        "mavlinkui vertical" + (componentClass ? " " + componentClass : ""),
      ...otherProps,
    },
    ...childs
  );
};
