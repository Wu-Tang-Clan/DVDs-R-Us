import {createStore,applyMiddleware} from 'redux';
import thunks from 'redux-thunk';
import {rootReducer} from './rootReducer';


export const store = createStore(rootReducer,applyMiddleware(thunks));


