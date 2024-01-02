import van from "vanjs-core";
import WidgetBorders from "../../components/WidgetBorders.js";
import { Input, Button } from "../../components/index.js";

const { div } = van.tags;

const width = van.state("25em");

export const Develop = () => {
  return WidgetBorders(() =>
    div(
      {
        onclick: () => {
          width.val = "15em";
        },
        style: () =>
          "width: " + width.val + ";height:25em;transition: width 2s;",
      },
      Button("Click me!"),
      Input()
    )
  );
};

export default Develop;
