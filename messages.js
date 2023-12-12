//
export const messageCommandType = "server_message";

export const messageCommand = ({ error, message, ...args }) => {
  const res = JSON.stringify({
    type: messageCommandType,
    error,
    message,
    ...args,
  });

  return res;
};

//
export const openDeviceConnectionCommandType = "open_connection_to_device";

export const openDeviceConnectionCommand = (args) => {
  const { port, baudRate } = args || {};

  return JSON.stringify({
    type: openDeviceConnectionCommandType,
    port,
    baudRate,
  });
};

//
export const sendMavlinkPacketCommandType = "on_packet_send";

export const sendMavlinkPacketCommand = ({ command, ...otherArgs }) => {
  const res = JSON.stringify({
    type: sendMavlinkPacketCommandType,
    command,
    ...otherArgs,
  });

  return res;
};

export default {
  messageCommand,
};
