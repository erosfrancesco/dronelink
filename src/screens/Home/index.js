import van from "vanjs-core";
import { Button, Input, VerticalLayout } from "../../components/index.js";

import DeviceConnectionSection from "./DeviceConnection.js";
import DeviceConnectionStatusSection from "./DeviceConnectionStatus.js";

/* So far:
  User connect to device
    -> Check device connection status
    -> Ask for device status
    -> Display device status and flags
/**/

// Home Screen
export const Home = () =>
  VerticalLayout(DeviceConnectionSection, DeviceConnectionStatusSection);

export default Home;
