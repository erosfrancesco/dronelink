import EventEmitter from "events";

export const event = new EventEmitter();

export const COMMANDLIST_RECEIVED = "CommandListReceived";
export const DEVICE_CONNECTED = "DeviceConnected";

export const PACKET_CLASSES_RECEIVED = "PacketClassesReceived";
export const MAVLINK_PACKET_RECEIVED = "MavlinkPacketReceived";

export const SERVER_CONNECTED = "ServerConnected";
export const SERVER_ERROR = "ServerError";
export const SERVER_ERROR_RECEIVED = "ServerErrorReceived";
export const SERVER_MESSAGE_RECEIVED = "ServerMessageReceived";

export const onCommandListReceived = (args) =>
  event.emit(COMMANDLIST_RECEIVED, args);
export const onServerConnected = () => event.emit(SERVER_CONNECTED);
export const onMessageErrorReceived = (error) =>
  event.emit(SERVER_ERROR_RECEIVED, error);
export const onDeviceConnected = () => event.emit(DEVICE_CONNECTED);
export const onPacketClassesReceived = (packetClasses) =>
  event.emit(PACKET_CLASSES_RECEIVED, packetClasses);
export const onPacketReceived = ({ packetType, packetData }) =>
  event.emit(MAVLINK_PACKET_RECEIVED, { packetType, packetData });
export const onMessageReceived = (message) =>
  event.emit(SERVER_MESSAGE_RECEIVED, message);
export const onServerErrorReceived = () =>
  event.emit(SERVER_ERROR, "WS Connection failed");
