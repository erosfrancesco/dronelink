import van from "vanjs-core";
import { WidgetBorders } from "../components/index.js";

const { div } = van.tags;

const toggleWidget = (isAnimating, isClosed) => (e) => {
  e.stopPropagation();
  e.preventDefault();

  if (isAnimating.val) {
    return;
  }

  isAnimating.val = true;
  isClosed.val = !isClosed.val;

  setTimeout(() => {
    isAnimating.val = false;
  }, 500);
};

export const ResizableWidget = ({
  WidgetOpen,
  WidgetClose,
  classOpen,
  classClose,
}) => {
  const isAnimating = van.state(false);
  const isClosed = van.state(false);

  return WidgetBorders(
    div(
      {
        class: () => classOpen + (isClosed.val ? " " + classClose : ""),
        onclick: toggleWidget(isAnimating, isClosed),
      },
      () => (isAnimating.val || isClosed.val ? WidgetClose() : WidgetOpen())
    )
  );
};
