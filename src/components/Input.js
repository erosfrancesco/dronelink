import van from "vanjs-core";
import "./Input.css";

const { input } = van.tags;

export const Input = ({ color, text, ...args }) =>
  input({
    class: () =>
      "mavlinkui" +
      (" mavlinkui-" + (color?.val || color || "primary")) +
      " mavlinkui-input",
    ...args,
  });

export default Input;
