import { Tracker } from "../ActionTypes/Types";

export const setTrackerData = (payload) => ({
  type: Tracker.SET_TRACKER_DATA,
  payload,
});
