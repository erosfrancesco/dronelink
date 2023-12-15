import "vanjs-core";
import AppShell from "./screens/index.js";

import ws, { setOnMavlinkPacketReceived } from "./client.js";

const App = () => {
  return AppShell();
};

export default App;
