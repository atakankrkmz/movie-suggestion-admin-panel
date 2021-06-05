const INITIAL_STATE = {
  token: null,
  message: "",
};
export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, token: action.payload };
    case "LOGIN_ERROR":
      return { ...state, message: action.payload };
    default:
      return state;
  }
};
