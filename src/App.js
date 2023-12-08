import van from "vanjs-core";
import Button from "./components/Button.js";

// import './client.js'

const { div } = van.tags;

const colorState = van.state("secondary");
const textState = van.state("Turn Primary");

const turnRed = () => {
  colorState.val = "primary";
  textState.val = "Turn Primary";
  onclickState.val = turnGreen;
};
const turnGreen = () => {
  colorState.val = "secondary";
  textState.val = "Turn Secondary";
  onclickState.val = turnRed;
};
const onclickState = van.state(turnRed);

const App = () => {
  return div(
    Button({
      color: colorState,
      text: "Click Me",
      onclick: () => alert("Clicked"),
    }),
    " ",
    Button({ color: colorState, text: textState, onclick: onclickState })
  );
};

export default App;
