import van from "vanjs-core";
import "./Button.css";

const { button } = van.tags;

export const Button = ({ color, text, onclick }) =>
  button(
    {
      class: () => "mavlinkui-button " + ("mavlinkui-button-" + (color.val || color)),
      // style: () => `background-color: ${van.val(color)};`,
      onclick,
    },
    text
  );

export default Button;
