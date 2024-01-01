//
export const messageCommandType = "server_message";
export const messageCommand = ({ error, message, ...args }) => {
  return JSON.stringify({
    type: messageCommandType,
    error,
    message,
    ...args,
  });
};

//
export const openDeviceConnectionCommandType = "open_device_connection";
export const openDeviceConnectionCommand = (args) => {
  const { port, baudRate } = args || {};

  return JSON.stringify({
    type: openDeviceConnectionCommandType,
    port,
    baudRate,
  });
};

//
export const closeDeviceConnectionCommandType = "close_device_connection";
export const closeDeviceConnectionCommand = (args) => {
  const { port } = args || {};

  return JSON.stringify({
    type: closeDeviceConnectionCommandType,
    port,
  });
};

//
export const sendMavlinkPacketCommandType = "on_packet_send";
export const sendMavlinkPacketCommand = ({ command, ...otherArgs }) => {
  return JSON.stringify({
    type: sendMavlinkPacketCommandType,
    command,
    ...otherArgs,
  });
};

//
export const sendCommandListCommandType = "on_commandlist_requested";
export const sendCommandListCommand = (args) => {
  return JSON.stringify({
    type: sendCommandListCommandType,
    ...args,
  });
};

//
export const sendPortListCommandType = "on_portlist_requested";
export const sendPortListCommand = (args) => {
  return JSON.stringify({
    type: sendPortListCommandType,
    ...args,
  });
};
