import van from "vanjs-core";
import {
  event,
  SERVER_CONNECTED,
  SERVER_ERROR,
  SERVER_ERROR_RECEIVED,
  SERVER_MESSAGE_RECEIVED,
} from "../client.js";

export const isServerConnected = van.state(false);
export const setIsServerConnected = (value) => (isServerConnected.val = value);
export const lastServerMessage = van.state(null); // maybe a history
export const setLastServerMessage = (value) => (lastServerMessage.val = value);
export const lastServerError = van.state(null); // maybe a history
export const setLastServerError = (value) => (lastServerError.val = value);

event.on(SERVER_CONNECTED, () => {
  setIsServerConnected(true);
});

event.on(SERVER_ERROR, (e) => {
  setLastServerError(e);
  setIsServerConnected(false);
});

event.on(SERVER_ERROR_RECEIVED, (e) => {
  setLastServerError(e);
  setIsServerConnected(false);
});

event.on(SERVER_MESSAGE_RECEIVED, (e) => {
  setLastServerMessage(e);
});
