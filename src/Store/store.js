import {} from "react-redux";
import { createStore, combineReducers } from "redux";

import trackerReducer from "./Reducers/Tracker.reducer";
import authReducer from "./Reducers/Auth.reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  tracker: trackerReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
