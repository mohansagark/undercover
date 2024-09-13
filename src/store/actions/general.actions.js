import { CHANGE_LOADER_STATUS } from "./types";

export const startSpinner = (dispatch) => {
  dispatch({ type: CHANGE_LOADER_STATUS, payload: true });
};

export const stopSpinner = (dispatch) => {
  dispatch({ type: CHANGE_LOADER_STATUS, payload: false });
};
