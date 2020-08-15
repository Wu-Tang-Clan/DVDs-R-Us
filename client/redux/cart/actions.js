/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import Alert from 'react-s-alert';
import CART_TYPES from './types';
import store from '../store';

const axios = require('axios');

export const addToCart = (movieId, quantity, title) => async (dispatch) => {
  await axios.post('/api/cart/addtocart', { movieId, quantity })
    .then((res) => {
      if (res.status === 204) {
        Alert.error(`Bummer! We don't have enough copies of ${title} to fulfill that order!`, {
          effect: 'slide',
          timeout: 1500,
        });
      } else {
        dispatch({
          type: CART_TYPES.ADD_TO_CART,
          order: res.data,
          price: ((res.data.quantity * 99) / 100),
        });
        Alert.success(`${title} added to cart!`, {
          effect: 'slide',
          timeout: 1500,
        });
      }
    });
};

export const getCartItems = () => async (dispatch) => {
  await axios.get('/api/cart')
    .then((res) => {
      if (res.data.length) {
        dispatch({
          type: CART_TYPES.GET_CART_ITEMS,
          orders: res.data,
          total: ((res.data.map((order) => order.quantity).reduce((a, b) => {
            // eslint-disable-next-line no-param-reassign
            a += (b * 99);
            return a;
          }, 0)) / 100),
        });
      } else {
        dispatch({
          type: CART_TYPES.GET_CART_ITEMS,
          orders: res.data,
          total: 0,
        });
      }
    });
};

export const getActiveCartItems = () => async (dispatch) => {
  await axios.get('api/cart/active')
    .then((res) => {
      if (res.data.length) {
        dispatch({
          type: CART_TYPES.GET_ACTIVE_CART_ITEMS,
          orders: res.data,
          total: ((res.data.map((order) => order.quantity).reduce((a, b) => {
            // eslint-disable-next-line no-param-reassign
            a += (b * 99);
            return a;
          }, 0)) / 100),
        });
      } else {
        dispatch({
          type: CART_TYPES.GET_ACTIVE_CART_ITEMS,
          orders: res.data,
          total: 0,
        });
      }
    });
};

export const removeFromCart = (movieId, cartId, title) => async (dispatch) => {
  await axios.delete(`/api/cart/removefromcart/${movieId}/${cartId}`);
  await axios.get('/api/cart/active')
    .then((res) => {
      if (res.data.length) {
        dispatch({
          type: CART_TYPES.REMOVE_FROM_CART,
          orders: res.data,
          total: ((res.data.map((order) => order.quantity).reduce((a, b) => {
            // eslint-disable-next-line no-param-reassign
            a += (b * 99);
            return a;
          }, 0)) / 100),
        });
        Alert.error(`${title} removed from cart`, {
          effect: 'slide',
          timeout: 1500,
        });
      } else {
        dispatch({
          type: CART_TYPES.REMOVE_FROM_CART,
          orders: res.data,
          total: 0,
        });
        Alert.error(`${title} removed from cart`, {
          effect: 'slide',
          timeout: 1500,
        });
      }
    });
};

export const editCartQuantity = (movieId, cartId, quantity) => async (dispatch) => {
  await axios.put(`/api/cart/editcartquantity/${movieId}/${cartId}`, {
    quantity,
  }).then(async (response) => {
    if (response.status === 204) {
      Alert.error('Bummer! We don\'t have enough copies to fulfill that order!', {
        effect: 'slide',
        timeout: 1500,
      });
    } else {
      await axios.get('/api/cart/active')
        .then((res) => {
          if (res.data.length) {
            dispatch({
              type: CART_TYPES.EDIT_CART_QUANTITY,
              orders: res.data,
              total: ((res.data.map((order) => order.quantity).reduce((a, b) => {
                // eslint-disable-next-line no-param-reassign
                a += (b * 99);
                return a;
              }, 0)) / 100),
            });
          } else {
            dispatch({
              type: CART_TYPES.EDIT_CART_QUANTITY,
              orders: res.data,
              total: 0,
            });
          }
        });
    }
  });
};

export const checkoutCart = () => async (dispatch) => {
  await axios.put('/api/cart/checkoutCart')
    .then((res) => {
      if (res.data.length) {
        dispatch({
          type: CART_TYPES.CHECKOUT_CART,
          orders: [],
          // eslint-disable-next-line max-len
          total: 0,
        });
      } else {
        dispatch({
          type: CART_TYPES.CHECKOUT_CART,
          orders: [],
          total: 0,
        });
      }
    });
};

export const adminPreviousOrders = () => async (dispatch) => {
  await axios.get('/api/cart/adminPreviousOrders')
    .then((res) => {
      dispatch({
        type: CART_TYPES.ADMIN_PREV_ORDERS,
        inactiveOrders: res.data,
      });
    });
};
