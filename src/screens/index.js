import van from "vanjs-core";
import Button from "../components/Button.js";
import { routes, currentRoute, goTo } from "./routings.js";
import "./index.css";

const { div, span } = van.tags;

const RoutesMenu = () =>
  div(
    { class: "mavlinkui horizontal routes-menu" },
    Object.keys(routes).map((route) => {
      const { linkLabel } = routes[route];
      const onclick = () => goTo(route);
      const color = route === currentRoute.val ? "primary" : "secondary";

      return Button({
        class: "routes-menu-item",
        color,
        onclick,
        text: linkLabel,
      });
    })
  );

export const AppShell = () =>
  div({ class: "mavlinkui vertical" }, RoutesMenu(), () => {
    const route = routes[currentRoute.val];

    if (!route) {
      return div(
        { class: "mavlinkui vertical" },
        span(currentRoute.val + " not found")
      );
    }

    const { content, linkLabel } = route;
    return div(
      { class: "mavlinkui vertical" },
      span({ class: "mavlinkui" }, linkLabel),
      content()
    );
  });

export default AppShell;
