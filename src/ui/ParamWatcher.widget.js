import van from "vanjs-core";
import { wsParameterRead, wsParameterWrite } from "../client/index.js";
import {
  MavlinkPacketWrapper,
  WidgetBorders,
  Input,
  TextBold,
  TextNormal,
  HorizontalLayout,
  VerticalLayout,
} from "../components/index.js";
const { div, span, input } = van.tags;

//
const writeParameter = (packet) => {
  wsParameterWrite(packet);
};

const readParameter = (paramId) => {
  wsParameterRead({ paramId });
};
//

//
const computeParamValue = (input) => {
  return parseFloat(input);
};

const setupWidget = (paramId) => {
  readParameter(paramId);
};

const ParamWatcherContent = ({ lastPacket, packetValueHistory }) => {
  const { paramValue, paramId, paramType } = lastPacket.val || {};
  const inputValue = van.state(paramValue);
  const previousValues = packetValueHistory.val
    .map((v, i) => {
      if (i) {
        return v;
      }
    })
    .filter((v) => v);

  return WidgetBorders(
    VerticalLayout(
      HorizontalLayout(
        TextNormal(paramId + " : "),
        TextBold(String(paramValue))
      ),

      Input({
        type: "number",
        color: "primary",
        value: inputValue,

        disabled: () => inputValue.val === null || inputValue.val === undefined,

        onclick: (e) => {
          e.stopPropagation();
          e.preventDefault();
        },
        onkeyup: (e) => {
          const { value } = e.target;
          inputValue.val = value;

          if (e.key === "Enter") {
            writeParameter({
              paramId,
              paramValue: computeParamValue(value),
              paramType,
            });
          }
        },
      }),

      TextNormal("Previous values: "),
      previousValues.length
        ? previousValues.map((value) => TextNormal(String(value)))
        : TextNormal("None")
    )
  );
};
//

export const ParameterWatcher = ({ paramId }) => {
  const lastPacket = van.state({});
  const packetValueHistory = van.state([]);
  const setupDone = van.state(false);

  if (!setupDone.val) {
    setupWidget(paramId);
    setupDone.val = true;
  }

  return MavlinkPacketWrapper(
    {
      packetName: "PARAM_VALUE",
      onPacketReceived: (e) => {
        const { lastReceivedPacket } = e;
        const { paramId: packetParamId, paramValue } = lastReceivedPacket;

        if (paramId === packetParamId) {
          packetValueHistory.val.unshift(paramValue);
          lastPacket.val = lastReceivedPacket;
        }
      },
    },
    () => ParamWatcherContent({ lastPacket, packetValueHistory })
  );
};
