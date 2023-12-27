import van from "vanjs-core";
import {
  VerticalLayout,
  StatusDisplay,
  TextNormal,
  TextBold,
  BorderBox,
  VanComponentArgsParser,
} from "../components/index.js";
import "./Command.widget.css";

import DeviceCommands from './DeviceCommands.js';

import {
  lastCommandAck,
  CommandResultsHelp,
  commandMap,
} from "../logic/index.js";

const { div } = van.tags;
const isAnimating = van.state(false);
const isClosed = van.state(false);

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

const WidgetOpen = ({ onclick }) => {
  const {
    result,
    command,
    progress,
    resultParam2,
    targetSystem,
    targetComponent,
  } = lastCommandAck.val;

  const commandStatusVerbose = CommandResultsHelp[result];

  return VerticalLayout(
    {
      class: "command_widget_content",
    },
    DeviceCommands(),
    VerticalLayout(
      { onclick },
      StatusDisplay(
        TextNormal("Command: "),
        TextBold(() => command)
      ),
      StatusDisplay(TextNormal("Result: "), ResultLabel({ result })),
      TextNormal(
        { class: "command_result_description" },
        () => commandStatusVerbose
      ),
      StatusDisplay(
        TextNormal("Progress: "),
        TextBold(() => progress)
      ),
      StatusDisplay(
        TextNormal("Result param: "),
        TextBold(() => resultParam2)
      )
    )
  );
};

const WidgetClose = ({ onclick }) => {
  const { result, command } = lastCommandAck.val;
  return div(
    { onclick, class: "command_widget_content" },
    StatusDisplay(
      TextBold(() => command),
      ResultLabel({ result })
    )
  );
};

//
export const CommandWidget = (...args) => {
  const { componentClass, childs, otherProps } = VanComponentArgsParser(
    ...args
  );

  const { ...props } = otherProps || {};

  const toggleWidget = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isAnimating.val) {
      return;
    }

    isAnimating.val = true;
    isClosed.val = !isClosed.val;

    setTimeout(() => {
      isAnimating.val = false;
    }, 500);
  };

  const className = () =>
    isClosed.val ? "command_widget command_widget_closed" : "command_widget";

  return div(
    {
      class: className,
    },
    BorderBox(() =>
      isAnimating.val || isClosed.val
        ? WidgetClose({ onclick: toggleWidget })
        : WidgetOpen({ onclick: toggleWidget })
    )
  );
};
