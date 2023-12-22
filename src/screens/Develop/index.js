import van from "vanjs-core";
import {
  VerticalLayout,
  HorizontalLayout,
  FlagsDisplay,
  StatusDisplay,
} from "../../components/index.js";
import DeviceCommands from "./DeviceCommands.js";


import { HeartbeatWidget } from "../../ui/Heartbeat.widget.js";
import { Heartbeat } from "./mocks.js";
const isConnectedMock = van.state(true);

const { div, span } = van.tags;

export const Develop = () => {
  return HeartbeatWidget({
    Heartbeat: { timestamp: "22/23/2023 12:67", ...Heartbeat },
    isConnected: isConnectedMock,
  });
};
//

export default Develop;
