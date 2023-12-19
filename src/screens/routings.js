import van from "vanjs-core";
import Home from "./Home/index.js";
import Develop from "./Develop/index.js";

const { div } = van.tags;

// Home (device connection and status)
// Commands (available after connected?)
// Logs (and error) UNUSED for now
// TODO: - Let's see what is required here. Then we set up the proper pages. For now this is sufficent.
// Develop section helps
export const routes = {
  "/": {
    linkLabel: "Home",
    content: Home,
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
