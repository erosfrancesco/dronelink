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

// TODO: - WRAPPER
function loadXMLDoc() {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.log("Got it", xmlhttp.responseXML);
      const paramFile = xmlhttp.responseXML.getElementsByTagName("paramfile");
      // paramfile => vehicle => parameters
      const parameters = paramFile[0].childNodes[1].children[0];

      const {
        childNodes,
        textContent,
        tagName,
        attributes: attributeEnum,
      } = parameters;
      childNodes.forEach((node) => {
        const {
          textContent,
          tagName,
          childNodes,
          attributes: attributeEnum,
        } = node;

        Object.keys(attributeEnum || {}).forEach((attributeName) => {
          const attribute = attributeEnum[attributeName];
          const { nodeName, nodeValue } = attribute;
          console.log(
            attributeEnum.humanName.nodeValue,
            ":",
            nodeName,
            "=",
            nodeValue
          );
        });
      });
    }
    /**
     * eg:
  Takeoff Check RPM maximum : humanName = Takeoff Check RPM maximum
  Takeoff Check RPM maximum : name = ArduCopter:TKOFF_RPM_MAX
  Takeoff Check RPM maximum : documentation = Takeoff is not permitted until motors report no more than this RPM.  Set to zero to disable check
  Takeoff Check RPM maximum : user = Standard
     */
  };
  xmlhttp.open("GET", "apm.pdef.xml", true);
  xmlhttp.send();
}
loadXMLDoc();

const { div, span, input } = van.tags;

// TODO: - Button for copying previous values

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
