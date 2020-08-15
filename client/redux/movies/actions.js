import Alert from 'react-s-alert';
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

export const orderStock = (id, title) => async (dispatch) => {
  await axios.post('/api/movies/order', { id })
    .then((res) => {
      if (res.status === 204) {
        Alert.warning(`${title} is already in our inventory`, {
          effect: 'slide',
          timeout: 1500,
        });
      } else {
        dispatch({
          type: MOVIE_TYPES.ORDER_STOCK,
          movie: res.data,
        });
        Alert.success(`${title} added to inventory`, {
          effect: 'jelly',
          timeout: 1500,
        });
      }
    });
};

export const removeMovie = (id, title) => async (dispatch) => {
  await axios.delete(`/api/movies/remove/${id}`);
  await axios.get('/api/movies')
    .then((res) => {
      dispatch({
        type: MOVIE_TYPES.REMOVE_MOVIE,
        updatedmovies: res.data,
      });
      Alert.error(`${title} removed from inventory.`, {
        effect: 'jelly',
        timeout: 1500,
      });
    });
};

export const addStock = (id) => async (dispatch) => {
  await axios.put(`/api/movies/addstock/${id}`)
    .then((res) => {
      dispatch({
        type: MOVIE_TYPES.ADD_STOCK,
        movie: res.data,
      });
    });
};
