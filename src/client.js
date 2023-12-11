import { openDeviceConnectionCommand } from "../server/adapters/index.js";
const ws = new WebSocket("ws://localhost:" + 5000);

const onWSOpen = () => {
  console.log("Connection to server extabilished");
  console.log("Trying to connect to port");

  ws.send(openDeviceConnectionCommand({ port: "COM6" }));
};

const onWSMessage = (buffer) => {
  try {
    const data = JSON.parse(buffer.data);
    const { type, ...args } = data;
    console.log("received message:", type);
  } catch (e) {
    console.log("Error parsing message: ", e);
  }
};

ws.onerror = console.error;
ws.onopen = onWSOpen;
ws.onmessage = onWSMessage;
