import van from "vanjs-core";
import { HorizontalLayout, VerticalLayout } from "./Layout.js";

const { span } = van.tags;

export const StatusDisplay = ({ values, minWidth = "20em" }) =>
  VerticalLayout(
    ...Object.keys(values).map((key) => {
      const value = values[key];

      return HorizontalLayout(
        span(
          // TODO: - Make variations of span
          { style: () => "min-width:" + minWidth + ";font-weight: 100;" },
          () => key + " :"
        ),
        span(() => value)
      );
    })
  );
