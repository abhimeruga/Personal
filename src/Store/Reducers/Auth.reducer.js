import { Auth } from "../ActionTypes/Types";

const initiateState = {
  pin: null,
  edit: false,
};

const authReducer = (state = initiateState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Auth.SET_PIN:
      return { ...state, pin: payload };
    case Auth.SET_EDIT: {
      return { ...state, edit: payload };
    }
    default:
      return state;
  }
};

export default authReducer;
