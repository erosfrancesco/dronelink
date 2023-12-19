import van from "vanjs-core";

const { div, span } = van.tags;

export const FlagsDisplay = ({
  flags = {},
  class: componentClass = "",
  ...args
}) =>
  div(
    {
      class: () => "mavlinkui" + (componentClass ? " " + componentClass : ""),
      ...args,
    },
    Object.keys(flags).map((flag) => {
      const flagValue = flags[flag];

      return div(span(flag + " : " + flagValue));
    })
  );

export default FlagsDisplay;
