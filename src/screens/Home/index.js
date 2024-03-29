/* So far:
  User connect to device
    -> Check device connection status
    -> Ask for device status
    -> Display device status and flags
/**/

import "vanjs-core";
import "./index.css";

import { HorizontalLayout } from "../../components/index.js";

import { HeartbeatWidget } from "../../ui/Heartbeat.widget.js";
import { ConnectionWidget } from "../../ui/Connection.widget.js";

export const Home = () =>
  HorizontalLayout(
    {
      class: "Home-Section",
    },
    ConnectionWidget(),
    HeartbeatWidget()
    // TODO: - Widget to set/get parameters
  );

export default Home;
