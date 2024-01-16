import van from "vanjs-core";
import "./Heartbeat.widget.css";

import {
  TextBold,
  TextNormal,
  HorizontalLayout,
  VerticalLayout,
  DisplayFlags,
  WidgetBorders,
  DisplayStatus,
} from "../components/index.js";

import {
  isConnected,
  mavlinkClasses,
  mavlinkPackets,
  MAVLINK_PACKET_RECEIVED,
  event,
} from "../logic/index.js";

import { ResizableWidget } from "./ResizableWidget.js";

const WidgetOpen = ({ lastReceivedPacket, receivedOn }) => {
  const { type, autopilot, systemStatus, baseMode } = lastReceivedPacket || {};

  return VerticalLayout(HorizontalLayout(WidgetClose({ receivedOn })), () =>
    isConnected?.val
      ? VerticalLayout(
          VerticalLayout(
            {
              class: "heartbeat_widget_info_wrapper",
            },
            DisplayStatus(TextBold("Device type:"), TextBold(type)),
            DisplayStatus(TextBold("System:"), TextBold(autopilot)),
            DisplayStatus(TextBold("Status:"), TextBold(systemStatus))
          ),

          DisplayStatus(
            {
              class: "heartbeat_widget_flag_wrapper",
            },
            TextBold("Mode:"),
            DisplayFlags({
              flags: baseMode,
            })
          )
        )
      : VerticalLayout()
  );
};

const WidgetClose = ({ receivedOn }) => {
  return HorizontalLayout(
    { class: "heartbeat_status_text_wrapper" },
    TextNormal("Last Heartbeat : "),
    TextBold(() => (isConnected?.val ? receivedOn : "Not connected"))
  );
};

export const HeartbeatWidget = () => {
  const packetType = mavlinkClasses.val?.HEARTBEAT;
  const data = van.state(mavlinkPackets.val[packetType] || {});
  if (packetType) {
    event.on(MAVLINK_PACKET_RECEIVED + "-" + packetType, (e) => {
      data.val = e;
    });
  }

  return ResizableWidget({
    WidgetClose: () => WidgetClose({ ...data.val }),
    WidgetOpen: () => WidgetOpen({ ...data.val }),
    classOpen: "heartbeat_widget",
    classClose: "heartbeat_widget_closed",
  });
};
