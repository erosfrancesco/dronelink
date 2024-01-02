/*
SysStatus {
    onboardControlSensorsPresent: 1467022383,
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
*/

import { common } from "node-mavlink";

export const parseSysStatus = (data) => {
  return {
    ...data,
  };
};

export default parseSysStatus;
