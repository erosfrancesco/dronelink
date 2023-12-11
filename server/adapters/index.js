// TO BE INCLUDED
import { SerialPort } from "serialport";

import { chat } from "../messages/actions.js";
import { setupMavlinkReader } from "./mavlink.js";

// TODO: -------------------------------------------------------------------------------------
// Port mapping for when is already connected
const onDeviceConnected = (connection, path) => {
  const res = JSON.stringify({
    type: chat,
    message: "Device connected on: " + path,
  });

  connection.send(res);
};

const openMavlinkConnection =
  (connection) =>
  async (path = "COM6", baudRate = 9600) => {
    //TODO: - Set up ws command for this
    // sendMavlinkRegistry(connection);

    try {
      const port = new SerialPort(
        {
          path,
          baudRate,
        },
        false
      );

      port.on("error", (e) => {
        console.log("port error", e); // THIS SHOULD WORK!
        // throw e;
      });

      port.on("open", () => onDeviceConnected(connection, path));

      const reader = setupMavlinkReader(connection, port);

      return port;
    } catch (e) {
      console.log("Error e", e);
      throw e;
    }
  };

export default openMavlinkConnection;
