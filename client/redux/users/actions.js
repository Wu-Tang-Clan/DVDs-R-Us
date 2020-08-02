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

export const logOut = () => (dispatch) => {
  axios.delete('/api/users/logout')
    .then(() => {
      dispatch({
        type: USER_TYPES.LOG_OUT,
      });
    });
};
