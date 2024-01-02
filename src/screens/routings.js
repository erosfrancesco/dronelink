import van from "vanjs-core";
import Home from "./Home/index.js";
import Commands from "./Commands/index.js";
import Develop from "./Develop/index.js";

const { div } = van.tags;

// Home (device connection and status)
// Commands (available after connected?)
// Logs (and error) UNUSED for now
// Develop section helps
export const routes = {
  "/": {
    linkLabel: "Home",
    content: Home,
  },
  "/commands": {
    linkLabel: "Commands",
    content: Commands,
  },
  "/develop": {
    linkLabel: "Develop",
    content: Develop,
  },
};

export const currentRoute = van.state(Object.keys(routes)[0]);
export const goTo = (route) => {
  currentRoute.val = route;
};

export default routes;
