import axios from "axios";

const API_URL = "https://moviesuggestionwebapi.azurewebsites.net/";

export const login = (credentials) => (dispatch) => {
  axios
    .post(`${API_URL}api/auth/login`, credentials)
    .then((response) =>
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data.token })
    )
    .catch((err) => dispatch({ type: "LOGIN_ERROR", payload: err }));
};
