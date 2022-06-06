import { Tracker } from "../ActionTypes/Types";

const initiateState = {
  data: null,
};

const trackerReducer = (state = initiateState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Tracker.SET_TRACKER_DATA:
      return { ...state, data: payload };
    default:
      return state;
  }
};

export default trackerReducer;
