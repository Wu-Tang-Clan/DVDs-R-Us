import MOVIE_TYPES from './types';

const initialState = {
  movies: [],
  imdbSearchResults: [],
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVIE_TYPES.GET_MOVIES:
      return {
        ...state,
        movies: action.movies,
      };
    case MOVIE_TYPES.SEARCH_IMDB:
      return {
        ...state,
        imdbSearchResults: action.results,
      };
    case MOVIE_TYPES.ORDER_STOCK:
      return {
        ...state,
        movies: [...state.movies, action.movie],
        imdbSearchResults: [],
      };
    case MOVIE_TYPES.REMOVE_MOVIE:
      return {
        ...state,
        // removedMovieResults:  action.updatedmovies,
        movies: action.updatedmovies,
      };
    case MOVIE_TYPES.ADD_STOCK:
      return {
        ...state,
        movies: state.movies.map((movie) => {
          if (movie.id === action.movie.id) {
            return action.movie;
          }
          return movie;
        }),
      };
    default:
      return state;
  }
};

export default movieReducer;
