import { createStore, compose } from 'redux';
import timer from './reducer/timer';

const store = createStore(
  timer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
