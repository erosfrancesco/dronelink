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

// TODO: - Button for copying previous values
/** // TODO: - 
  <field name="Range">0.1 0.4</field>
  <field name="Increment">.01</field> 
 */

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
//

const ParamWatcherContent = ({
  lastPacket,
  packetValueHistory,
  parameterOptions = {},
}) => {
  const { paramValue, paramId, paramType } = lastPacket.val || {};
  const inputValue = van.state(paramValue);
  const previousValues = packetValueHistory.val
    .map((v, i) => {
      if (i) {
        return v;
      }
    })
    .filter((v) => v);

  const inputOptions = {
    // type="range" min="1" max="100" value="50
    // type: "number",
    color: "primary",
    value: inputValue,

    // disabled: () => inputValue.val === null || inputValue.val === undefined,

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
  };

  return WidgetBorders(
    VerticalLayout(
      HorizontalLayout(
        TextNormal(paramId + " : "),
        TextBold(String(paramValue))
      ),

      Input({ ...inputOptions, ...parameterOptions }),

      TextNormal("Previous values: "),
      previousValues.length
        ? previousValues.map((value) => TextNormal(String(value)))
        : TextNormal("None")
    )
  );
};
//

export const ParameterWatcher = ({ paramId, setup = readParameter }) => {
  const lastPacket = van.state({});
  const packetValueHistory = van.state([]);
  const setupDone = van.state(false);

  if (!setupDone.val) {
    setup(paramId);
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
