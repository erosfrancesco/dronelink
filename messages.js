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

export const MessageDeviceConnected = "Device connected";
export const MessagePacketNamesList = "Mavlink packet names";

//
export const openDeviceConnectionCommandType = "device/open";
export const openDeviceConnectionCommand = (args) => {
  const { port, baudRate } = args || {};

  return JSON.stringify({
    type: openDeviceConnectionCommandType,
    port,
    baudRate,
  });
};

export const closeDeviceConnectionCommandType = "device/close";
export const closeDeviceConnectionCommand = (args) => {
  const { port } = args || {};

  return JSON.stringify({
    type: closeDeviceConnectionCommandType,
    port,
  });
};

export const sendPortListCommandType = "device/available";
export const sendPortListCommand = (args) => {
  return JSON.stringify({
    type: sendPortListCommandType,
    ...args,
  });
};

//
export const sendMavlinkPacketCommandType = "commands/send";
export const sendMavlinkPacketCommand = ({ command, ...otherArgs }) => {
  return JSON.stringify({
    type: sendMavlinkPacketCommandType,
    command,
    ...otherArgs,
  });
};

//
export const sendCommandListCommandType = "commands/list";
export const sendCommandListCommand = (args) => {
  return JSON.stringify({
    type: sendCommandListCommandType,
    ...args,
  });
};
//

//
export const sendParameterReadCommandType = "mavlink/parameters/read";
export const sendParameterReadCommand = (args) => {
  return JSON.stringify({
    type: sendParameterReadCommandType,
    ...args,
  });
};

export const sendParameterWriteCommandType = "mavlink/parameters/write";
export const sendParameterWriteCommand = (args) => {
  return JSON.stringify({
    type: sendParameterWriteCommandType,
    ...args,
  });
};

//
export const sendPacketClassesType = 'mavlink/packets/classes';
export const requestPacketClasses = () => {
  return  JSON.stringify({
    type: sendPacketClassesType,
  }); 
}

export const sendPacketClassesMessage = (packetClasses) => {
  return  JSON.stringify({
    type: messageCommandType,
    message: MessagePacketNamesList,
    packetClasses
  });
}
//