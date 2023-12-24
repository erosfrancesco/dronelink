export const Heartbeat = {
  autopilot: "ARDUPILOTMEGA",
  customMode: 0,
  mavlinkVersion: 3,
  systemStatus: "STANDBY",
  type: "QUADROTOR",
  timestamp: "12/02/23, 17:34",
  baseMode: {
    CUSTOM_MODE: 1,
    ARM_MODE: 0,
    FOO_MODE: 0,
  },
};

// COMMAND_ACK
export const CommandAck = {
  command: "REQUEST_MESSAGE",
  progress: 0,
  result: "ACCEPTED",
  resultParam2: 0,
  targetComponent: 1,
  targetSystem: 254,
};

// SYS_STATUS
export const SysStatus = {
  onboardControlSensorsPresent: 1467022383,
  onboardControlSensorsEnabled: 1382030383,
  onboardControlSensorsHealth: 1198562351,
  load: 328,
  voltageBattery: 25,
  currentBattery: 6,
  batteryRemaining: 99,
  dropRateComm: 0,
  errorsComm: 0,
  errorsCount1: 0,
  errorsCount2: 0,
  errorsCount3: 0,
  errorsCount4: 0,
  onboardControlSensorsPresentExtended: 0,
  onboardControlSensorsEnabledExtended: 0,
  onboardControlSensorsHealthExtended: 0,
};

// PARAM_VALUE
export const ParamValue = {
  paramId: "STAT_RUNTIME",
  paramValue: 41203,
  paramType: 6,
  paramCount: 973,
  paramIndex: 65535,
};
