import { FETCH_FAVOURITES, FETCH_IMAGES, EMPTY_IMAGES } from "../actionTypes";
import axios from "axios";

export const getImages = (pageNumber) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const { data } = await axios.get(`/images/${pageNumber}`, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({ type: FETCH_IMAGES, payload: data.images });
  } catch (err) {
    console.log(err);
  }
};

export const getFavourites = (pageNumber) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const { data } = await axios.get(`/get/favourite/${pageNumber}`, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({ type: FETCH_FAVOURITES, payload: data.favourite });
  } catch (err) {
    console.log(err);
  }
};

export const emptyImages = () => {
  return {
    type: EMPTY_IMAGES,
  };
};
