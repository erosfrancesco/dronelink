import { minimal } from "node-mavlink";

import { flagsEnumParser } from "./utils.js";

/* MavModeFlag 
    // also has reverse.
    '128': 'SAFETY_ARMED,
    ...

    // should get only these:

    'SAFETY_ARMED' = 128,
    'MANUAL_INPUT_ENABLED' = 64,
    'HIL_ENABLED' = 32,
    'STABILIZE_ENABLED' = 16,
    'GUIDED_ENABLED' = 8,
    'AUTO_ENABLED' = 4,
    'TEST_ENABLED' = 2,
    'CUSTOM_MODE_ENABLED' = 1
}
/** */

export const parseMavModeFlag = (n) => {
  return flagsEnumParser(n, minimal.MavModeFlag);
};

export default parseMavModeFlag;
