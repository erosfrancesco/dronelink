import van from "vanjs-core";
import {
  VerticalLayout,
  TextNormal,
  TextBold,
  SelectionFiltrable,
  VanComponentArgsParser,
} from "../components/index.js";

import { commandMap } from "../logic/index.js";

const { div } = van.tags;

const ResultLabel = ({ result }) =>
  TextBold(
    {
      class: () =>
        result === Object.keys(CommandResultsHelp)[0]
          ? "command_result_accepted"
          : "command_result_rejected",
    },
    () => result
  );

export const CommandList = () => {};
