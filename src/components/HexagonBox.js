import van from "vanjs-core";
import VanComponentArgsParser from "./utils.js";
import "./HexagonBox.css";

const { div } = van.tags;

export const HexagonBox = (...args) => {
  const { componentClass, childs, otherProps } = VanComponentArgsParser(
    ...args
  );

  const { ...props } = otherProps;

  return div(
    {
      class: "deco-box",
      ...props,
    },
    div(
      {
        class: "deco-box-content",
      },
      div({
        class: "deco-border deco-gradient-corner-1", // top left
      }),
      div({
        class: "deco-border border-top deco-gradient-ver", // top
      }),
      div({
        class: "deco-border deco-gradient-corner-2", // top right
      })
    ),

    div(
      {
        class: "deco-box-content",
        style: "flex: 1 !important;",
      },
      div({
        class: "deco-border border-left deco-gradient-hor", // left
      }),
      div(
        {
          class: "deco-border-content",
        },
        div(...childs)
      ),
      div({
        class: "deco-border border-right deco-gradient-hor", // right
      })
    ),

    div(
      {
        class: "deco-box-content",
      },
      div({
        class: "deco-border border-bottom-left deco-gradient-corner-3", // left bottom
      }),
      div({
        class: "deco-border border-bottom deco-gradient-ver", // bottom
      }),

      div({
        class: "deco-border border-bottom-right deco-gradient-corner-4", // bottom right
      })
    )
  );
};
