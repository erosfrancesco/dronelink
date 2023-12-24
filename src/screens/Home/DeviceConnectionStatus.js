import "vanjs-core";
import { HorizontalLayout } from "../../components/index.js";
import { isConnected, lastHeartBeat } from "../../logic/index.js";
import { HeartbeatWidget } from "../../ui/Heartbeat.widget.js";
import { ConnectionWidget } from "../../ui/Connection.widget.js";

export const DeviceConnectionStatusSection = () =>
  HorizontalLayout(
    {
      style:
        "align-content: flex-start;align-items: flex-start;justify-content: flex-start;",
    },
    ConnectionWidget(),
    HeartbeatWidget()
  );

export default DeviceConnectionStatusSection;
