import van from "vanjs-core";
import Button from "../components/Button.js";
import Input from "../components/Input.js";

import {
  devicePath,
  setDevicePath,
  isConnected,
  lastHeartBeat,
  openDevicePath,
  disconnectDevicePath,
} from "./Home.logic.js";

const { div, span } = van.tags;

/* So far:
TODO: - 
  User connect to device
    -> Check device connection status
    -> Ask for device status
    -> Display device status
/**/

// Sections
const DeviceConnectionSection = () =>
  div(
    { class: "mavlinkui horizontal" },
    Button({
      text: () => (isConnected.val ? "disconnect" : "connect to:"),
      style: "max-width: 7em;",
      onclick: () => {
        isConnected.val ? disconnectDevicePath() : openDevicePath();
      },
    }),
    Input({
      value: devicePath,
      color: "secondary",
      style: "max-width: 7em;",
      onkeyup: (e) => {
        const { value = "" } = e?.target || {};
        setDevicePath(value);
      },
    })
  );

// TODO: - Set heartbeat parser
/**

Heartbeat: {
  system_status, autopilot, base_mode
}

0	MAV_STATE_UNINIT	Uninitialized system, state is unknown.
1	MAV_STATE_BOOT	System is booting up.
2	MAV_STATE_CALIBRATING	System is calibrating and not flight-ready.
3	MAV_STATE_STANDBY	System is grounded and on standby. It can be launched any time.
4	MAV_STATE_ACTIVE	System is active and might be already airborne. Motors are engaged.
5	MAV_STATE_CRITICAL	System is in a non-normal flight mode (failsafe). It can however still navigate.
6	MAV_STATE_EMERGENCY	System is in a non-normal flight mode (failsafe). It lost control over parts or over the whole airframe. It is in mayday and going down.
7	MAV_STATE_POWEROFF	System just initialized its power-down sequence, will shut down now.
8	MAV_STATE_FLIGHT_TERMINATION	System is terminating itself (failsafe or commanded).


128	MAV_MODE_FLAG_SAFETY_ARMED	0b10000000 MAV safety set to armed. Motors are enabled / running / can start. Ready to fly. Additional note: this flag is to be ignore when sent in the command MAV_CMD_DO_SET_MODE and MAV_CMD_COMPONENT_ARM_DISARM shall be used instead. The flag can still be used to report the armed state.
64	MAV_MODE_FLAG_MANUAL_INPUT_ENABLED	0b01000000 remote control input is enabled.
32	MAV_MODE_FLAG_HIL_ENABLED	0b00100000 hardware in the loop simulation. All motors / actuators are blocked, but internal software is full operational.
16	MAV_MODE_FLAG_STABILIZE_ENABLED	0b00010000 system stabilizes electronically its attitude (and optionally position). It needs however further control inputs to move around.
8	MAV_MODE_FLAG_GUIDED_ENABLED	0b00001000 guided mode enabled, system flies waypoints / mission items.
4	MAV_MODE_FLAG_AUTO_ENABLED	0b00000100 autonomous mode enabled, system finds its own goal positions. Guided flag can be set or not, depends on the actual implementation.
2	MAV_MODE_FLAG_TEST_ENABLED	0b00000010 system has a test mode enabled. This flag is intended for temporary system tests and should not be used for stable implementations.
1	MAV_MODE_FLAG_CUSTOM_MODE_ENABLED	0b00000001 Reserved for future use.
   */
const DeviceConnectionStatusSection = () =>
  div(
    { class: "mavlinkui horizontal", style: "flex: 2;" },
    span("Last Heartbeat : "),
    span(
      { style: "padding-left:1em;" },
      () => lastHeartBeat.val?.timestamp || "Not connected"
    )
  );

const DeviceCommandSection = () =>
  div(
    Input({
      value: "Command",
      color: "secondary",
      onkeyup: (e) => {
        const { value = "" } = e?.target || {};
        // setDevicePath(value);
      },
    }),
    Button({
      text: "Send command",
      onclick: () => {
        console.log("Not implemented yet");
      },
    })
  );
//

// Home Screen
export const Home = () =>
  div(
    div(
      { class: "mavlinkui horizontal" },
      DeviceConnectionSection,
      DeviceConnectionStatusSection
    ),
    div(
      {
        class: "mavlinkui",
      },
      DeviceCommandSection
    )
  );

export default Home;
