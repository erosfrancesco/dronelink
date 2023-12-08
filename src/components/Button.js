import van from "vanjs-core";
import "./Button.css";

const { button } = van.tags;

export const Button = ({ color, text, onclick }) =>
  button(
    {
      class: "StyledButton",
      style: () => `background-color: ${van.val(color)};`,
      onclick,
    },
    text
  );

export default Button;
