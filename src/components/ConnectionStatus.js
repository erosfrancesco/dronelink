import van from "vanjs-core";
import { VerticalLayout } from "./Layout.js";

import {
  isServerConnected,
  lastServerError,
  lastServerMessage,
} from "../logic/index.js";

const { span, div } = van.tags;

export const ConnectionStatus = () =>
  VerticalLayout(
    span(
      () =>
        "Server is: " + (isServerConnected.val ? "connected" : "disconnected")
    ),
    span(() => "Server Message: " + (lastServerMessage.val || "None")),
    span(() => "Server Error: " + (lastServerError.val || "None"))
  );
export default ConnectionStatus;
