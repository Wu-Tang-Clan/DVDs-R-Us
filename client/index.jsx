//  Highest Level where we use ReactDOM.render();
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import store from './redux/store';

const root = document.querySelector('#root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root,
);
