import van from "vanjs-core";
import {
  TextNormal,
  Button,
  VerticalLayout,
  HorizontalLayout,
} from "../components/index.js";
import { routes, currentRoute, goTo } from "./routings.js";

import "./index.css";

const RoutesMenu = () =>
  HorizontalLayout(
    { class: "routes-menu" },
    Object.keys(routes).map((route) => {
      const { linkLabel } = routes[route];
      const onclick = () => goTo(route);
      const color = "primary";

      return Button(
        {
          class: () =>
            "routes-menu-item" +
            (currentRoute.val === route ? " current-route" : ""),
          color,
          onclick,
        },
        () => linkLabel
      );
    })
  );

export const AppShell = () =>
  VerticalLayout(
    () => RoutesMenu(),
    () => {
      const route = routes[currentRoute.val];

      if (!route) {
        return VerticalLayout(TextNormal(currentRoute.val + " not found"));
      }

      const { content, linkLabel } = route;
      return VerticalLayout(content());
    }
  );

export default AppShell;
