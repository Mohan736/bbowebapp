import { combineReducers } from "redux";
import mainreducer from "./reducer";

const rootReducer = combineReducers({
  data: mainreducer,
});

export default rootReducer;
