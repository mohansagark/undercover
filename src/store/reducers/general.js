import { CHANGE_LOADER_STATUS } from "../actions/types";

const initialState = {
  loader: false,
};

const general = (state = initialState, action) => {
  const { type, payload } = action;
  if (typeof state === "undefined") {
    return state;
  }
  switch (type) {
    case CHANGE_LOADER_STATUS:
      return {
        ...state,
        loader: payload,
      };
    default:
      return state;
  }
};

export default general;
