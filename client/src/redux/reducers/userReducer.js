import { USER_CREATE, USER_LOGIN, USER_LOGOUT } from "../actionTypes";

const userState = {
  user: null,
  token: JSON.parse(localStorage.getItem("token")),
};

const userReducer = (state = userState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_CREATE:
      return { ...state, user: payload.user, token: payload.token };
    case USER_LOGIN:
      const userToken = JSON.stringify(payload.token);
      localStorage.setItem("token", userToken);
      return { ...state, user: payload.user, token: payload.token };
    case USER_LOGOUT:
      localStorage.removeItem("token");
      return { ...state, user: null, token: null };
    default:
      return state;
  }
};

export default userReducer;
