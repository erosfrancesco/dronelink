import van from "vanjs-core";
import VanComponentArgsParser from "./utils.js";

import "./WidgetBorders.css";

const { div } = van.tags;

const BorderCorner = (cornerClass = "") =>
  div({
    class: "widget-border-corner " + cornerClass,
  });

const BorderHorizontal = (cornerClass = "") =>
  div({
    class: "widget-border-horizontal " + cornerClass,
  });

const BorderVertical = (cornerClass = "") =>
  div({
    class: "widget-border-vertical " + cornerClass,
  });

export const WidgetBorders = (...args) => {
  const { childs } = VanComponentArgsParser(...args);

  return div(
    {
      class: "widget-border-wrapper",
    },
    div(
      { class: "widget-border-middle" },
      BorderCorner("widget-gradient-corner-1"),
      BorderHorizontal("widget-gradient-hor"),
      BorderCorner("widget-gradient-corner-3")
    ),
    div(
      { class: "widget-border-middle" },
      BorderVertical("widget-gradient-ver"),
      div({ class: "widget-border-content" }, ...childs),
      BorderVertical("widget-gradient-ver")
    ),
    div(
      { class: "widget-border-middle" },
      BorderCorner("widget-gradient-corner-2"),
      BorderHorizontal("widget-gradient-hor"),
      BorderCorner("widget-gradient-corner-4")
    )
  );
};

export default WidgetBorders;
