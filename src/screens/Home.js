import van from "vanjs-core";
import Button from "../components/Button.js";
import Input from "../components/Input.js";

const { div } = van.tags;

// TO BE MOVED IN A REDUX-LIKE SECTION
export const portName = van.state("COM6");

// Sections
const DeviceConnectionSection = () => {
  return div(
    { class: "mavlinkui", style: "flex-direction: row;" },
    Button({
      text: "connect to:",
      style: "max-width: 7em;",
      onclick: () => {
        console.log(portName);
      },
    }),
    Input({
      value: portName,
      color: "secondary",
      style: "max-width: 7em;",
      onkeyup: (e) => {
        const { value = "" } = e?.target || {};
        portName.val = value;
      },
    })
  );
};
//

// Home (device connection and status)
export const Home = () => {
  return div(DeviceConnectionSection);
};

export default Home;
