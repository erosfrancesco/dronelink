import van from "vanjs-core";
import Button from "./components/Button.js";

import './client.js'

const { div } = van.tags;

const colorState = van.state("green");
const textState = van.state("Turn Red");

const turnRed = () => {
  colorState.val = "red";
  textState.val = "Turn Green";
  onclickState.val = turnGreen;
};
const turnGreen = () => {
  colorState.val = "green";
  textState.val = "Turn Red";
  onclickState.val = turnRed;
};
const onclickState = van.state(turnRed);

const App = () => {
  return div(
    Button({
      color: "yellow",
      text: "Click Me",
      onclick: () => alert("Clicked"),
    }),
    " ",
    Button({ color: colorState, text: textState, onclick: onclickState })
  );
};

export default App;
