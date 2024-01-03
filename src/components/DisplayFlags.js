import van from "vanjs-core";
import { VerticalLayout } from "./Layout.js";
import { TextNormal } from "./Typography.js";

const FlagValueDisplay = ({ flag, value }) => {
  const color = value ? "green" : "brown";

  return TextNormal({ style: "color:" + color + ";" }, flag + " : " + value);
};

// TODO: - Van Args parser?
export const DisplayFlags = ({
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

export default DisplayFlags;
