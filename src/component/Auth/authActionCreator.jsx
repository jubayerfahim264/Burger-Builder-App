/* eslint-disable no-unused-vars */
import * as actionTypes from "../../redux/actionTypes";
import axios from "axios";

export const auth = (email, password, mode) => (dispatch) => {
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
    .then((response) => console.log(response));
};
