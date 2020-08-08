import MOVIE_TYPES from './types';

const axios = require('axios');

export const getMovies = () => async (dispatch) => {
  await axios.get('/api/movies')
    .then((response) => {
      dispatch({
        type: MOVIE_TYPES.GET_MOVIES,
        movies: response.data,
      });
    });
};

export const searchImdb = (searchInput) => async (dispatch) => {
  await axios.post('/api/movies/imdbsearch', { searchInput })
    .then((res) => {
      dispatch({
        type: MOVIE_TYPES.SEARCH_IMDB,
        results: res.data,
      });
    });
};

export const orderStock = (id) => async (dispatch) => {
  await axios.post('/api/movies/order', { id })
    .then((res) => {
      dispatch({
        type: MOVIE_TYPES.ORDER_STOCK,
        movie: res.data,
      });
    });
};

export const removeMovie = (id) => async (dispatch) => {
  await axios.delete(`/api/movies/remove/${id}`);
  await axios.get('/api/movies')
    .then((res) => {
      dispatch({
        type: MOVIE_TYPES.REMOVE_MOVIE,
        updatedmovies: res.data,
      });
    });
};

export const addMovie = () => async () => {
//  action created to prevent linting error caused by not exporting default
};
