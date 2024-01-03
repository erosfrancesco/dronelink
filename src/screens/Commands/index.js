import "vanjs-core";
import "./index.css";

import { HorizontalLayout } from "../../components/index.js";

import { CommandResultWidget } from "../../ui/CommandResult.widget.js";
import { CommandSendWidget } from "../../ui/CommandSend.widget.js";

export const Commands = () =>
  HorizontalLayout(
    {
      class: "Commands-Section",
    },
    CommandResultWidget(),
    CommandSendWidget()
  );

export default Commands;
