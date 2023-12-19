import van from "vanjs-core";
import { VerticalLayout } from "./Layout.js";

const { div, span } = van.tags;

const FlagValueDisplay = ({ flag, value }) => {
  const color = value ? "green" : "brown";

  return span({ style: "color:" + color + ";" }, flag + " : " + value);
};

export const FlagsDisplay = ({
  flags = {},
  class: componentClass = "",
  ...args
}) =>
  VerticalLayout(
    {
      class: () => "mavlinkui" + (componentClass ? " " + componentClass : ""),
      ...args,
    },
    Object.keys(flags).map((flag) => {
      const value = flags[flag];

      return FlagValueDisplay({ flag, value });
    })
  );

export default FlagsDisplay;
