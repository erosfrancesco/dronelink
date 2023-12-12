import van from "vanjs-core";
import Button from "./components/Button.js";
import Input from "./components/Input.js";

import { colorState, textState, onclickState } from "./logic.js";

import './client.js'

const { div } = van.tags;

const App = () => {
  return div(
    Button({
      color: colorState,
      text: "Click Me",
      onclick: () => alert("Clicked"),
    }),
    " ",
    Button({ color: colorState, text: textState, onclick: onclickState }),
    Input({ color: colorState })
  );
};

export default App;
