import CART_TYPES from './types';

const initialState = {
  orders: [],
  total: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_TYPES.ADD_TO_CART:
      return {
        ...state,
        orders: [...state.orders, action.order],
        total: (Number(state.total) + Number(action.price)).toFixed(2),
      };
    case CART_TYPES.GET_CART_ITEMS:
      return {
        ...state,
        orders: action.orders,
        total: Number(action.total).toFixed(2),
      };
    case CART_TYPES.CLEAR_STORE_CART:
      return {
        ...state,
        orders: [],
        total: 0,
      };
    case CART_TYPES.REMOVE_FROM_CART:
      return {
        ...state,
        orders: action.orders,
        total: Number(action.total).toFixed(2),
      };
    case CART_TYPES.EDIT_CART_QUANTITY:
      return {
        ...state,
        orders: action.orders,
        total: Number(action.total).toFixed(2),
      };
    default: return state;
  }
};

export default cartReducer;
