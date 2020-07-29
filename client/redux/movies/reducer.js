import { MOVIE_TYPES } from "./types";

const initialState = {
  movies: [],
};

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVIE_TYPES.GET_MOVIES:
      return {
        ...state,
        movies: action.movies,
      };
    default:
      return state;
  }
};


