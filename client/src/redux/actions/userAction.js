import { USER_CREATE, USER_LOGIN, USER_LOGOUT } from "../actionTypes";
import axios from "axios";

export const userCreate = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post("/register", {
      ...user,
    });
    dispatch({ type: USER_CREATE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const authUser = () => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const { data } = await axios.get("/auth/user", {
      headers: {
        Authorization: token,
      },
    });
    console.log(data)
    dispatch({ type: USER_CREATE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/login`, { ...user });
    dispatch({ type: USER_LOGIN, payload: data });
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    dispatch({ type: USER_LOGOUT });
  } catch (err) {
    console.error(err);
  }
};
