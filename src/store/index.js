/* eslint-disable global-require */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const middleware = process.env.NODE_ENV !== 'production'
  ? [require('redux-immutable-state-invariant').default(), thunk]
  : [thunk];
/**
 * @param {*} initialState
 * @return {*} createStore
 */
function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(...middleware),
  );
}

const store = configureStore();
export default store;
