import { combineReducers } from 'redux';
import movieReducer from './movies/reducer';
import userReducer from './users/reducer';

const rootReducer = combineReducers({
  movieReducer,
  userReducer,
});

export default rootReducer;
