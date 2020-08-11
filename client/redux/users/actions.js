/* eslint-disable no-alert */
import Alert from 'react-s-alert';
import USER_TYPES from './types';
import CART_TYPES from '../cart/types';

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
        Alert.success(`Welcome ${res.data.username}!`, {
          effect: 'slide',
          timeout: 1000,
        });
      } else {
        // eslint-disable-next-line no-alert
        Alert.error('Your username or password was wrong :(', {
          effect: 'slide',
          timeout: 1500,
        });
        // alert('Your username or password was wrong :(');
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
      dispatch({
        type: CART_TYPES.CLEAR_STORE_CART,
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

export const toggleAdmin = (userId, userName, isAdmin) => (dispatch) => {
  axios.put(`/api/users/setadmin/${userId}`, { isAdmin });
  axios.get('api/users/')
    .then((res) => {
      dispatch({
        type: USER_TYPES.SET_ADMIN,
        users: res.data,
      });
      if (isAdmin === true) {
        Alert.success(`${userName} is set as Admin`, {
          effect: 'slide',
          timeout: 1500,
        });
      } else {
        Alert.success(`${userName} is removed as Admin`, {
          effect: 'slide',
          timeout: 1500,
        });
      }
    });
};

export const changeUserName = (userId, userName, newUserName) => (dispatch) => {
  axios.put(`/api/users/changeusername/${userId}`, { newUserName });
  axios.get(`api/users/${userId}`)
    .then((res) => {
      dispatch({
        type: USER_TYPES.CHANGE_USERNAME,
        users: res.data,
      });
      if (res.status === 200) {
        Alert.success(`Your username has been updated to ${res.data.username}`, {
          effect: 'slide',
          timeout: 1500,
        });
      }
    });
};

export const getUserPreviousReviews = (userId) => (dispatch) => {
  axios.get(`/api/users/userreviews/${userId}`)
    .then((res) => {
      dispatch({
        type: USER_TYPES.USER_PREVIOUS_REVIEWS,
        myreviews: res.data.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
      });
    });
};
