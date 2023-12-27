import van from "vanjs-core";
import "./Button.css";
import VanComponentArgsParser from "./utils.js";

const { button } = van.tags;

export const Button = (...args) => {
  const { componentClass, childs, otherProps } = VanComponentArgsParser(
    ...args
  );

  const { color, ...props } = otherProps;

  return button(
    {
      class: () =>
        "mavlinkui" +
        (" mavlinkui-" + (color?.val || color || "primary")) +
        " mavlinkui-button" +
        (componentClass ? " " + componentClass : ""),
      ...props,
    },
    ...childs
  );
};

export default Button;
