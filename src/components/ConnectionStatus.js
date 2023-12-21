import van from "vanjs-core";
import { VerticalLayout } from "./Layout.js";
import { TextNormal } from "./Typography.js";

import {
  isServerConnected,
  lastServerError,
  lastServerMessage,
} from "../logic/index.js";

export const ConnectionStatus = () =>
  VerticalLayout(
    TextNormal(
      () =>
        "Server is: " + (isServerConnected.val ? "connected" : "disconnected")
    ),
    TextNormal(() => "Server Message: " + (lastServerMessage.val || "None")),
    TextNormal(() => "Server Error: " + (lastServerError.val || "None"))
  );
export default ConnectionStatus;
