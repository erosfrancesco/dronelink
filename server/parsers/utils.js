export const defaultDataParser = (data) =>
  JSON.parse(
    JSON.stringify(
      data,
      // bigint and other values??
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    )
  );

// Don't use this. Use the function below
const flagsParserLoop = (n, flags, flagMap, counter = 0) => {
  const flag = flags[counter];
  if (!flag) {
    return flagMap;
  }

  const bit = n % 2;
  flagMap[flag] = bit;

  return flagsParserLoop(n >> 1, flags, flagMap, counter + 1);
};

// Used in case n is a sum of flags
export const flagsParser = (n, flags) => {
  const flagMap = {};
  flags.forEach((flag) => {
    flagMap[flag] = 0;
  });

  if (!n) {
    // if the initial value of n was 0, return empty flag map
    return flagMap;
  }

  return flagsParserLoop(n, flags, flagMap);
};

// Used in case where there is something like this:
/**
 * enum {
 * '1': flag1,
 * '2': flag2,
 * ...
 * flag1,
 * flag2
 * ...
 * }
 */
export const mapMavlinkEnum = (mavlinkEnum) => {
  const values = Object.keys(mavlinkEnum);

  // get the first half of enumFlags
  // they should already be sorted
  return values
    .map((value, i) => {
      if (i > (values.length - 1) / 2) {
        return;
      }

      const flag = mavlinkEnum[value];
      return { value, flag };
    })
    .filter((v) => v) // remove undefined
    .sort((a, b) => {
      const { value: v1 } = a;
      const { value: v2 } = b;

      return v1 - v2;
    });
};

// used when n is the sum of specific flags, in a structure like this:
/**
 * enum {
 * '1': flag1,
 * '2': flag2,
 * ...
 * flag1,
 * flag2
 * ...
 * }
 */
export const flagsEnumParser = (n, enumFlags) =>
  flagsParser(
    n,
    mapMavlinkEnum(enumFlags).map((v) => {
      const { flag } = v || {};
      return flag;
    })
  );
