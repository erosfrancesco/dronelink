import van from "vanjs-core";
import { HorizontalLayout } from "../../components/index.js";

import DeviceConnectionStatusSection from "./DeviceConnectionStatus.js";

/* So far:
  User connect to device
    -> Check device connection status
    -> Ask for device status
    -> Display device status and flags
/**/

// Home Screen
export const Home = () => DeviceConnectionStatusSection();

export default Home;
