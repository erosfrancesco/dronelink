import van from "vanjs-core";
import { HorizontalLayout, VerticalLayout } from "./Layout.js";
import { TextNormal, TextBold } from "./Typography.js";

const { span } = van.tags;

export const StatusDisplay = ({ values, minWidth = "20em" }) =>
  VerticalLayout(
    ...Object.keys(values).map((key) => {
      const value = values[key];

      return HorizontalLayout(
        TextNormal(
          // TODO: - Make variations of span
          { style: () => "min-width:" + minWidth + ";" },
          () => key + " :"
        ),
        TextBold(() => value)
      );
    })
  );
