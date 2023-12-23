import "vanjs-core";
import { isConnected, lastHeartBeat } from "../../logic/index.js";
import { HeartbeatWidget } from "../../ui/Heartbeat.widget.js";
// TODO: - ConnectionWidget

// Heartbeat packet
export const DeviceConnectionStatusSection = () =>
  HeartbeatWidget({ Heartbeat: lastHeartBeat?.val, isConnected });

export default DeviceConnectionStatusSection;
