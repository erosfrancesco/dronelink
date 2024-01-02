/*
SysStatus {
    onboardControlSensorsPresent: 1467022383, // common.MavSysStatusSensor
    onboardControlSensorsEnabled: 1382030383,
    onboardControlSensorsHealth: 1198562351,
    load: 318,
    voltageBattery: 28,
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
    onboardControlSensorsHealthExtended: 0
}

/*
 * 0x01 3D gyro
'SENSOR_3D_GYRO' = 1,
 * 0x02 3D accelerometer
'SENSOR_3D_ACCEL' = 2,
  ...
*/

import { common } from "node-mavlink";
import { flagsEnumParser } from "./utils.js";

export const parseSysStatus = (data) => {
  const {
    onboardControlSensorsPresent, // present
    onboardControlSensorsEnabled, // enabled
    onboardControlSensorsHealth, // healthy
    load,
    voltageBattery,
    currentBattery,
    batteryRemaining,
    dropRateComm,
    errorsComm,
    errorsCount1,
    errorsCount2,
    errorsCount3,
    errorsCount4,
    onboardControlSensorsPresentExtended, // present
    onboardControlSensorsEnabledExtended, // enabled
    onboardControlSensorsHealthExtended, // healthy
  } = data;

  return {
    onboardControlSensorsPresent: flagsEnumParser(
      onboardControlSensorsPresent,
      common.MavSysStatusSensor
    ),
    onboardControlSensorsEnabled: flagsEnumParser(
      onboardControlSensorsEnabled,
      common.MavSysStatusSensor
    ),
    onboardControlSensorsHealth: flagsEnumParser(
      onboardControlSensorsHealth,
      common.MavSysStatusSensor
    ),

    load,
    voltageBattery,
    currentBattery,
    batteryRemaining,
    dropRateComm,
    errorsComm,
    errorsCount1,
    errorsCount2,
    errorsCount3,
    errorsCount4,
    onboardControlSensorsPresentExtended: flagsEnumParser(
      onboardControlSensorsPresentExtended,
      common.MavSysStatusSensorExtended
    ),
    onboardControlSensorsEnabledExtended: flagsEnumParser(
      onboardControlSensorsEnabledExtended,
      common.MavSysStatusSensorExtended
    ),
    onboardControlSensorsHealthExtended: flagsEnumParser(
      onboardControlSensorsHealthExtended,
      common.MavSysStatusSensorExtended
    ),
  };
};

export default parseSysStatus;
