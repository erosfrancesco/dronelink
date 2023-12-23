import van from "vanjs-core";
import { HorizontalLayout, VerticalLayout } from "./Layout.js";
import { TextNormal, TextBold } from "./Typography.js";

const { span } = van.tags;

export const StatusDisplay = (...childs) =>
  HorizontalLayout(
    {
      style: "justify-content: space-between;width: 100%;height: 100%;",
    },
    ...childs
  );

export const StatusDisplayMultiple = ({ values, minWidth = "20em" }) =>
  VerticalLayout(
    ...Object.keys(values).map((key) => {
      const value = values[key];

      return HorizontalLayout(
        TextNormal(
          { style: () => "min-width:" + minWidth + ";" },
          () => key + " :"
        ),
        TextBold(() => value)
      );
    })
  );
