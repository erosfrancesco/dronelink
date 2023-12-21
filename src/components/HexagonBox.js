import van from "vanjs-core";
import VanComponentArgsParser from "./utils.js";
import "./HexagonBox.css";

const { div, span } = van.tags;

// TODO: - Controllers
const isAnimating = van.state(false);
const isClosed = van.state(false);

export const HexagonBox = (...args) => {
  const { componentClass, childs, otherProps } = VanComponentArgsParser(
    ...args
  );

  const { style, ...props } = otherProps;

  const animationStart = () => {
    isAnimating.val = true;
    isClosed.val = !isClosed.val;

    setTimeout(() => {
      isAnimating.val = false;
    }, 500);
  };

  return div(
    div({ onclick: () => animationStart() }, "click me!"),
    div(
      {
        class: () =>
          "deco-box deco-box-animation" +
          (componentClass ? " " + componentClass : ""),
        style: () =>
          style +
          (isClosed.val ? "width: 1em !important;height: 1em !important;" : ""), // interpolate otherProps with width and height
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
          div(
            {
              style: () =>
                isAnimating.val || isClosed.val ? "display: none;" : "",
            },
            ...childs
          )
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
    )
  );
};
