import * as actionTypes from "../../redux/actionTypes";
import axios from "axios";

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      token: token,
      userId: userId,
    },
  };
};

export const authLoading = (isLoading) => {
  return {
    type: actionTypes.AUTH_LOADING,
    payload: isLoading,
  };
};

export const authFailed = (errMsg) => {
  return {
    type: actionTypes.AUTH_FAILED,
    payload: errMsg,
  };
};
export const auth = (email, password, mode) => (dispatch) => {
  dispatch(authLoading(true));
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  let AuthUrl = null;
  if (mode === "Sign up") {
    AuthUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  } else {
    AuthUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  }
  const API_KEY = "AIzaSyDH8Nh1K_V6kZwS89EyxgSmaP9gPswuNK8";
  axios
    .post(AuthUrl + API_KEY, authData)
    .then((response) => {
      dispatch(authLoading(false));
      localStorage.setItem("token", response.data.idToken);
      localStorage.setItem("userId", response.data.localId);
      const expiretionTime = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );
      localStorage.setItem("expireTime", expiretionTime);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
    })
    .catch((err) => {
      dispatch(authLoading(false));
      dispatch(authFailed(err.response.data.error.message));
    });
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expireTime");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
export const authCheck = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) {
    //log out
    dispatch(logout());
  } else {
    const expiretionTime = new Date(localStorage.getItem("expireTime"));
    if (expiretionTime <= new Date()) {
      //log out
      dispatch(logout());
    } else {
      const userId = localStorage.getItem("userId");
      dispatch(authSuccess(token, userId));
    }
  }
};
