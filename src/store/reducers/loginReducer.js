import {
  SET_USER_INFO,
  GET_USER_INFO,
  RESET_USER_INFO,
  RESET_USER_GOOGLE_INFO,
} from "../actions/types";

const initialState = {
  userInfo: {},
  googleInfo: {},
  isLoggedIn: false,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      let temp = { ...state.userInfo, ...action.payload };
      let googleData =
        action?.payload?.providerData?.providerId === "google.com"
          ? action.payload
          : state.googleInfo;
      return {
        ...state,
        isLoggedIn: action?.payload?.emailVerified ?? false,
        userInfo: temp,
        googleInfo: googleData,
      };
    case GET_USER_INFO:
      return state.userInfo;

    case RESET_USER_INFO:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: {},
        googleInfo: {},
      };

    case RESET_USER_GOOGLE_INFO:
      return {
        ...state,
        googleInfo: {},
      };

    default:
      return state;
  }
};

export default login;
