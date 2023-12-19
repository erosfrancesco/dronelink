import van from "vanjs-core";
import Home from "./Home/index.js";

const { div } = van.tags;

// Home (device connection and status)
// Commands (available after connected?)
// Logs (error) UNUSED for now
// TODO: - Let's see what is required here. Then we set up the proper pages. For now this is sufficent.
export const routes = {
  "/": {
    linkLabel: "Home",
    content: Home,
  },
  /*
  "/logs": {
    linkLabel: "Logs",
    content: () => div(),
  },
  /** */
  "/commands": {
    linkLabel: "Commands",
    content: () => div(),
  },
};

export const currentRoute = van.state(Object.keys(routes)[0]);
export const goTo = (route) => {
  currentRoute.val = route;
};

export default routes;
