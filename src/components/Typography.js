import van from "vanjs-core";
import VanComponentArgsParser from "./utils.js";
import "./Typography.css";

const { span } = van.tags;

export const TextNormal = (...args) => {
  const { componentClass, childs, otherProps } = VanComponentArgsParser(
    ...args
  );

  return span(
    {
      class: "text-normal" + (componentClass ? " " + componentClass : ""),
      ...otherProps,
    },
    ...childs
  );
};

export const TextBold = (...args) => {
    const { componentClass, childs, otherProps } = VanComponentArgsParser(
      ...args
    );
  
    return span(
      {
        class: "text-bold" + (componentClass ? " " + componentClass : ""),
        ...otherProps,
      },
      ...childs
    );
  };
