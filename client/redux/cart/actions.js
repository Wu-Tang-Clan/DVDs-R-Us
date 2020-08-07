/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import CART_TYPES from './types';
import store from '../store';

const axios = require('axios');

export const addToCart = (movieId, quantity) => async (dispatch) => {
  await axios.post('/api/cart/addtocart', { movieId, quantity })
    .then((res) => {
      dispatch({
        type: CART_TYPES.ADD_TO_CART,
        order: res.data,
        price: (res.data.quantity * 0.99).toFixed(2),
      });
      console.log('UPDATED STORE', store.getState().cartReducer);
    });
};

export const getCartItems = () => async (dispatch) => {
  await axios.get('/api/cart')
    .then((res) => {
      if (res.data.length) {
        dispatch({
          type: CART_TYPES.GET_CART_ITEMS,
          orders: res.data,
          total: res.data.map((order) => Number(order.quantity)).reduce((a, b) => a + (b * 0.99)),
        });
      } else {
        dispatch({
          type: CART_TYPES.GET_CART_ITEMS,
          orders: res.data,
          total: Number(0),
        });
      }
    });
};

export const removeFromCart = (movieId, cartId) => async (dispatch) => {
  await axios.delete(`/api/cart/removefromcart/${movieId}/${cartId}`);
  await axios.get('/api/cart')
    .then((res) => {
      if (res.data.length) {
        dispatch({
          type: CART_TYPES.REMOVE_FROM_CART,
          orders: res.data,
          total: res.data.map((order) => Number(order.quantity)).reduce((a, b) => a + (b * 0.99)),
        });
      } else {
        dispatch({
          type: CART_TYPES.REMOVE_FROM_CART,
          orders: res.data,
          total: Number(0),
        });
      }
    });
};
