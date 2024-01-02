import "vanjs-core";
import "./index.css";

import { HorizontalLayout } from "../../components/index.js";

import { CommandWidget } from "../../ui/Command.widget.js";

export const Commands = () =>
  HorizontalLayout(
    {
      class: "Commands-Section",
    },
    CommandWidget()
  );

export default Commands;
