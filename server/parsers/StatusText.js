/*
MavSeverity {
     * System is unusable. This is a "panic" condition.
'EMERGENCY' = 0,
     * Action should be taken immediately. Indicates error in non-critical systems.
'ALERT' = 1,
     * Action must be taken immediately. Indicates failure in a primary system.
'CRITICAL' = 2,
     * Indicates an error in secondary/redundant systems.
'ERROR' = 3,
     * Indicates about a possible future error if this is not resolved within a given timeframe. Example
     * would be a low battery warning.
'WARNING' = 4,
     * An unusual event has occurred, though not an error condition. This should be investigated for the
     * root cause.
'NOTICE' = 5,
     * Normal operational messages. Useful for logging. No action is required for these messages.
'INFO' = 6,
     * Useful non-operational messages that can assist in debugging. These should not occur during normal
     * operation.
'DEBUG' = 7
}

StatusText {
    severity: 2,
    text: 'PreArm: Throttle radio max too low',
    id: 0,
    chunkSeq: 0
}
/** */

import { common } from "node-mavlink";

export const parseStatusText = (data) => {
  const { severity: severityValue, text, id, chunkSeq } = data;
  // console.log(severityValue, Object.keys(common.MavSeverity));
  const severity = Object.keys(common.MavSeverity).find(
    (key) => common.MavSeverity[key] === severityValue
  );

  return {
    severity,
    text,
    id,
    chunkSeq,
  };
};

export default parseStatusText;
