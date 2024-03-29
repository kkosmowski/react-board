import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  // composeEnhancers(applyMiddleware(thunk, logger)),
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;