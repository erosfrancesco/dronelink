// UNUSED. ONLY TESTS
// and references
import van from "vanjs-core";

export const colorState = van.state("secondary");
export const textState = van.state("Turn Primary");

export const turnRed = () => {
  colorState.val = "primary";
  textState.val = "Turn Primary";
  onclickState.val = turnGreen;
};
export const turnGreen = () => {
  colorState.val = "secondary";
  textState.val = "Turn Secondary";
  onclickState.val = turnRed;
};
export const onclickState = van.state(turnRed);
