import { Auth } from "../ActionTypes/Types";

export const setPin = (payload) => ({
  type: Auth.SET_PIN,
  payload,
});

export const setEdit = (payload) => ({
  type: Auth.SET_EDIT,
  payload,
});
