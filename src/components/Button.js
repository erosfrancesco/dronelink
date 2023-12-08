import van from "vanjs-core";
import "./Button.css";

const { button } = van.tags;

export const Button = ({ color, text, onclick }) =>
  button(
    {
      class: () =>
        "mavlinkui" +
        (" mavlinkui-" + (color.val || color) || "primary") +
        " mavlinkui-button",
      onclick,
    },
    text
  );

export default Button;
