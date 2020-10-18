import { FETCH_IMAGES, FETCH_FAVOURITES, EMPTY_IMAGES } from "../actionTypes";

const imageState = {
  images: [],
  favourites: [],
};

const imageReducer = (state = imageState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_IMAGES:
      return { ...state, images: [...state.images, ...payload] };
    case FETCH_FAVOURITES:
      return { ...state, favourites: [...state.favourites, ...payload] };
    case EMPTY_IMAGES:
      return { ...state, images: [], favourites: [] };
    default:
      return state;
  }
};

export default imageReducer;
