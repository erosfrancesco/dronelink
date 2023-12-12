// WS ADAPTER
export const messageCommandType = "server_message";

export const messageCommand = ({ error, message, ...args }) => {
  const res = JSON.stringify({
    type: messageCommandType,
    error,
    message,
    ...args
  });

  return res;
};

export const handleMessage = (ws, { type, ...args }) => {
  if (type !== messageCommandType) {
    return;
  }

  const { error, message } = args;
  console.log("Got message from client:", message);
  console.log("Got error from client:", error);
};

export default handleMessage;
