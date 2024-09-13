import { combineReducers } from "redux";
import login from "./loginReducer";
import todo from "./todoReducer";
import general from "./general";

const appReducer = combineReducers({
  login,
  todo,
  general,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
