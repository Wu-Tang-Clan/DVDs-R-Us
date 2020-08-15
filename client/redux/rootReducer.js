import { combineReducers } from 'redux';
import movieReducer from './movies/reducer';
import userReducer from './users/reducer';
import cartReducer from './cart/reducer';

const rootReducer = combineReducers({
  movieReducer,
  userReducer,
  cartReducer,
});

export default rootReducer;
