import van from "vanjs-core";
import { routes, currentRoute, goTo } from "./routings.js";
import "./index.css";

const { div, span } = van.tags;

const RoutesMenu = () =>
  div(
    { class: "mavlinkui routes-menu" },
    Object.keys(routes).map((route) => {
      const { linkLabel } = routes[route];
      const classes =
        "mavlinkui mavlinkui-button routes-menu-item " +
        (route === currentRoute.val
          ? "mavlinkui-primary"
          : "mavlinkui-secondary");
      const onclick = () => goTo(route);

      return div({ class: () => classes, onclick }, span(linkLabel));
    })
  );

export const AppShell = () => {
  return () =>
    div({ class: "mavlinkui" }, RoutesMenu(), () => {
      const route = routes[currentRoute.val];

      if (!route) {
        return div(
          { class: "mavlinkui" },
          span(currentRoute.val + " not found")
        );
      }

      const { content, linkLabel } = route;
      return div(
        { class: "mavlinkui" },
        span({ class: "mavlinkui" }, linkLabel),
        content()
      );
    });
};

export default AppShell;
