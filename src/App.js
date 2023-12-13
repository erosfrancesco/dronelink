import van from "vanjs-core";
import AppShell from "./screens/index.js";

import ws, { setOnMavlinkPacketReceived } from "./client.js";

setOnMavlinkPacketReceived((packetType, packetData) => {
  console.log("Got mavlink packet: ", packetType, packetData);
});

const App = () => {
  return AppShell();
};

export default App;
