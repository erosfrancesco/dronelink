import van from "vanjs-core";

const { div, span } = van.tags;

export const routes = {
  "/": {
    linkLabel: "Home",
    content: () => div(),
  },
  "/about": {
    linkLabel: "About",
    content: () => div(),
  },
  "/friends": {
    linkLabel: "Friends",
    content: () => div(),
  },
};

export const currentRoute = van.state(Object.keys(routes)[0]);

export const displayCurrentRoute = () => {
  return () =>
    div(() => {
      const route = routes[currentRoute.val];

      if (!route) {
        return div(span("not found"));
      }

      const { content, linkLabel } = route;
      return div(span(linkLabel), content());
    });
};

export default displayCurrentRoute;
