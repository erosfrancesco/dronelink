import van from "vanjs-core";
import { HorizontalLayout, VerticalLayout } from "./Layout.js";
import { TextNormal, TextBold } from "./Typography.js";
import VanComponentArgsParser from "./utils.js";

const { span } = van.tags;

export const DisplayStatus = (...args) => {
  const { componentClass, childs, otherProps } = VanComponentArgsParser(
    ...args
  );

  return HorizontalLayout(
    {
      class: componentClass,
      style: "justify-content: space-between;width: 100%;height: 100%;",
      ...otherProps,
    },
    ...childs
  );
};
