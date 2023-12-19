import van from "vanjs-core";
import VanComponentArgsParser from "./utils.js";
import "./Input.css";

const { input } = van.tags;

export const Input = (...args) => {
  const { componentClass, childs, otherProps } = VanComponentArgsParser(
    ...args
  );
  const { color, ...props } = otherProps || {};

  return input(
    {
      class: () =>
        "mavlinkui" +
        (" mavlinkui-" + (color?.val || color || "primary")) +
        " mavlinkui-input" +
        (componentClass ? " " + componentClass : ""),
      ...props,
    },
    ...childs
  );
};

export default Input;
