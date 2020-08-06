/* eslint-disable no-alert */
import USER_TYPES from './types';

const axios = require('axios');

export const login = (username, password, history) => (dispatch) => {
  // console.log('login function!!!');
  axios.post('/api/users/login', { username, password })
    .then(async (res) => {
      // console.log('response', res.status);
      if (res.status === 200) {
        dispatch({
          type: USER_TYPES.LOGIN,
          user: res.data,
        });
        history.goBack();
      } else {
        // eslint-disable-next-line no-alert
        alert('Your username or password was wrong :(');
      }
    })
    .catch((e) => {
      throw e;
    });
};

export const loginCheck = () => (dispatch) => {
  axios.get('/api/users/logincheck')
    .then((res) => {
      // console.log(res.data);
      dispatch({
        type: USER_TYPES.LOGIN_CHECK,
        userData: res.data,
      });
    });
};

export const logOut = (history) => (dispatch) => {
  axios.delete('/api/users/logout')
    .then(() => {
      dispatch({
        type: USER_TYPES.LOG_OUT,
      });
      history.push('/logout');
    });
};

export const getUsers = () => (dispatch) => {
  axios.get('/api/users')
    .then((res) => {
      dispatch({
        type: USER_TYPES.GET_USERS,
        users: res.data,
      });
    });
};

export const signup = (username, password, history) => (dispatch) => {
  axios.post('/api/users/signup', { username, password })
    .then(async (res) => {
      dispatch({
        type: USER_TYPES.SIGNUP,
        newUser: res.data,
        status: res.status,
      });
      if (res.status === 200) {
        history.goBack();
      }
    })
    .catch((e) => {
      throw e;
    });
};

export const submitReview = (review, rating, movieId) => (dispatch) => {
  axios.post('/api/users/review', { review, rating, movieId })
    .then((res) => {
      if (res.data) {
        alert('Thank you for leaving a review!');
        dispatch({
          type: USER_TYPES.LEAVE_REVIEW,
          review: res.data,
        });
      } else {
        alert('woops! Something went wrong');
      }
    });
};

export const getReviews = (id) => (dispatch) => {
  axios.get(`/api/users/reviews/${id}`)
    .then((res) => {
      dispatch({
        type: USER_TYPES.GET_REVIEWS,
        reviews: res.data.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
      });
    });
};
