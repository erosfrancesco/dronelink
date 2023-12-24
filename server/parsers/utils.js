export const defaultDataParser = (data) =>
  JSON.stringify(
    data,
    // bigint and other values??
    (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
  );

// check if first n === 0, if so return [0].
// Same case with NaN?
export const bitwiseFlagsParser = (n, flags = []) => {
  if (!n) {
    // if the initial value of n was 0, flags is empty. Return [0]
    if (!flags.length) {
      return [0];
    }

    // in this case, some recursion happened and flags has some value
    return flags;
  }

  const bit = n % 2;
  const remainder = n >> 1;
  flags.push(bit);

  return mavlinkFlagsParser(remainder, flags);
};

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
  const flags = values
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

  return flags;
};

export const flagsEnumParser = (n, enumFlags) => {
  const flags = mapMavlinkEnum(enumFlags)
    /*
  const keys = Object.keys(enumFlags);

  // get the first half of enumFlags
  // they should already be sorted
  const flags = keys
    .map((key, i) => {
      if (i > (keys.length - 1) / 2) {
        return;
      }
      return { bitPosition: key, flag: enumFlags[key] };
    })
    .filter((v) => v) // remove undefined
    .sort((a, b) => {
      const { bitPosition: v1 } = a;
      const { bitPosition: v2 } = b;

      return v1 - v2;
    })
    /** */
    .map((v) => {
      const { flag } = v || {};
      return flag;
    });

  return flagsParser(n, flags);
};
