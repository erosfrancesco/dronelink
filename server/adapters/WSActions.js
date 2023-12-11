export const messageCommandType = "server_error";

export const messageCommand = ({ error, message }) => {
  const res = JSON.stringify({
    type: messageCommandType,
    error,
    message,
  });

  return res;
};

export const handleMessage = (ws, { type, ...args }) => {
  if (type !== messageCommandType) {
    return;
  }

  const { error, message } = args;
  console.log("Got message from server:", message);
  console.log("Got error from server:", error);
};

export default handleMessage;
