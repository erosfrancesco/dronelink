import van from "vanjs-core";
import Button from "./components/Button.js";
import Input from "./components/Input.js";

import { colorState, textState, onclickState } from "./logic.js";

import displayCurrentRoute, { currentRoute, routes } from "./routings.js";

import "./client.js";

const { div } = van.tags;

const App = () => {
  setTimeout(() => {
    currentRoute.val = Object.keys(routes)[1];
    console.log("Setting up routes: ", currentRoute, routes);
  }, 1000);

  // TODO: - Make shell with links
  return displayCurrentRoute();
  /*
    Button({
      color: colorState,
      text: "Click Me",
      onclick: () => alert("Clicked"),
    }),
    " ",
    Button({ color: colorState, text: textState, onclick: onclickState }),
    Input({ color: colorState })
    /** */
};

export default App;
