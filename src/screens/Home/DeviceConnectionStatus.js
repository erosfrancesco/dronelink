import "vanjs-core";
import { VerticalLayout } from "../../components/index.js";
import {
  isConnected,
  lastHeartBeat,
  isServerConnected,
  lastServerError,
  lastServerMessage,
} from "../../logic/index.js";
import { HeartbeatWidget } from "../../ui/Heartbeat.widget.js";
import { ConnectionWidget } from "../../ui/Connection.widget.js";

export const DeviceConnectionStatusSection = () =>
  VerticalLayout(
    ConnectionWidget({
      isConnected: isServerConnected,
      error: lastServerError,
      message: lastServerMessage,
    }),
    HeartbeatWidget({ Heartbeat: lastHeartBeat, isConnected })
  );

export default DeviceConnectionStatusSection;
