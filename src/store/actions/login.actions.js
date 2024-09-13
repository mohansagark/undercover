import {
  SET_USER_INFO,
  GET_USER_INFO,
  RESET_USER_INFO,
  RESET_USER_GOOGLE_INFO,
} from "./types";
import {
  auth,
  db,
  gitHubProvider,
  googleAuthProvider,
  metaProvider,
} from "../../config/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { loginErrors } from "../errors/loginErrors";
import { startSpinner, stopSpinner } from "./general.actions";
import { doc, serverTimestamp, setDoc } from "@firebase/firestore";

export const getUserInfo = () => {
  return {
    type: GET_USER_INFO,
  };
};

export const userEmailLogin =
  (email, password, onSuccess, onError) => async (dispatch) => {
    dispatch(startSpinner);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user?.emailVerified) {
          dispatch(setUserInfo(user));
          onSuccess();
          dispatch(stopSpinner);
        } else {
          onError("Please verify your email address and try again.");
          dispatch(stopSpinner);
        }
      })
      .catch((error) => {
        let errorMessage = loginErrors(error) ?? "";
        onError(errorMessage);
        dispatch(stopSpinner);
      });
  };

export const googleLogin = (onSuccess, onError) => async (dispatch) => {
  dispatch(startSpinner);
  signInWithPopup(auth, googleAuthProvider)
    .then((result) => {
      let credential = GoogleAuthProvider.credentialFromResult(result);
      let token = credential.accessToken;
      let user = result.user;
      dispatch(stopSpinner);
      dispatch(setUserInfo({ ...user, token }));
      onSuccess();
    })
    .catch((error) => {
      let errorMessage = error.message;
      errorMessage = loginErrors(error) ?? "";
      onError(errorMessage);
      dispatch(stopSpinner);
    });
};

export const gitHubLogin = (onSuccess, onError) => async (dispatch) => {
  dispatch(startSpinner);
  signInWithPopup(auth, gitHubProvider)
    .then((result) => {
      let credential = GithubAuthProvider.credentialFromResult(result);
      let token = credential.accessToken;
      let user = result.user;
      dispatch(stopSpinner);
      dispatch(setUserInfo({ ...user, token }));
      onSuccess();
    })
    .catch((error) => {
      let errorMessage = error.message;
      errorMessage = loginErrors(error) ?? "";
      onError(errorMessage);
      dispatch(stopSpinner);
    });
};

export const metaLogin = (onSuccess, onError) => async (dispatch) => {
  dispatch(startSpinner);
  signInWithPopup(auth, metaProvider)
    .then((result) => {
      let credential = FacebookAuthProvider.credentialFromResult(result);
      let token = credential.accessToken;
      let user = result.user;
      dispatch(stopSpinner);
      dispatch(setUserInfo({ ...user, token }));
      onSuccess();
    })
    .catch((error) => {
      let errorMessage = error.message;
      errorMessage = loginErrors(error) ?? "";
      onError(errorMessage);
      dispatch(stopSpinner);
    });
};

export const sendVerificationEmail =
  (email, onSuccess, onError) => async (dispatch) => {
    dispatch(startSpinner);
    sendEmailVerification({ email: email })
      .then((result) => {
        dispatch(stopSpinner);
        onSuccess();
      })
      .catch((error) => {
        let errorMessage = error.message;
        errorMessage = loginErrors(error) ?? "";
        onError(errorMessage);
        dispatch(stopSpinner);
      });
  };

export const sendpasswordResetEmail =
  (email, onSuccess, onError) => async (dispatch) => {
    dispatch(startSpinner);
    sendPasswordResetEmail(auth, email)
      .then((result) => {
        let user = result.user;
        console.log(user, "user");
        dispatch(stopSpinner);
        onSuccess();
      })
      .catch((error) => {
        let errorMessage = error.message;
        errorMessage = loginErrors(error) ?? "";
        onError(errorMessage);
        dispatch(stopSpinner);
      });
  };

export const signUpWithEmail =
  (data, onSuccess, onError) => async (dispatch) => {
    dispatch(startSpinner);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        console.log(response);
        if (response.user.email) {
          sendEmailVerification(auth.currentUser)
            .then((res) => {
              onSuccess();
              dispatch(stopSpinner);
            })
            .catch((error) => {
              let errorMessage = error.message;
              errorMessage = loginErrors(error) ?? "";
              onError(errorMessage);
              dispatch(stopSpinner);
            });
        }
        dispatch(
          setUserData({ ...data, uid: response.user.uid }, () => {}, onError)
        );
      })
      .catch((error) => {
        let errorMessage = error.message;
        errorMessage = loginErrors(error) ?? "";
        onError(errorMessage);
        dispatch(stopSpinner);
      });
  };

export const setUserData = (data, onSuccess, onError) => async (dispatch) => {
  dispatch(startSpinner);
  setDoc(doc(db, "users", data.uid), {
    ...data,
    timeStamp: serverTimestamp(),
  })
    .then((res) => {
      onSuccess();
    })
    .catch((error) => {
      let errorMessage = error.message;
      errorMessage = loginErrors(error) ?? "";
      onError(errorMessage);
      dispatch(stopSpinner);
    });
};

export const setUserInfo = (payload) => {
  return {
    type: SET_USER_INFO,
    payload,
  };
};

export const resetUserInfo = () => {
  return {
    type: RESET_USER_INFO,
  };
};

export const resetGoogleInfo = () => {
  return {
    type: RESET_USER_GOOGLE_INFO,
  };
};
