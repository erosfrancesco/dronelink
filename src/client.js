import { deviceConnected } from "../server/messages/actions.js";
const ws = new WebSocket("ws://localhost:" + 5000);

const onWSOpen = () => {
  console.log("Connection to server extabilished");
  console.log("Trying to connect to port");

  
// TODO: -------------------------------------------------------------------------------------
// Port mapping for when is already connected
  ws.send(JSON.stringify({ type: deviceConnected, port: "COM6" }));
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
