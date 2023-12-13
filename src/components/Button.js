import van from "vanjs-core";
import "./Button.css";

const { button } = van.tags;

export const Button = ({ color, text, class: buttonClass = "", ...args }) =>
  button(
    {
      class: () =>
        "mavlinkui" +
        (" mavlinkui-" + (color?.val || color || "primary")) +
        " mavlinkui-button" +
        (buttonClass ? " " + buttonClass : ""),
      ...args,
    },
    text
  );

export default Button;
