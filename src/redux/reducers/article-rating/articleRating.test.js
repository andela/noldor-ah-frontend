import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import reducer from './articleRating';
import userReducer from './userArticleRating';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Reducers test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });
  it('should handle RATE_ARTICLE_SUCCESS', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const action = {
      type: 'RATE_ARTICLE_SUCCESS',
      data: store.data
    };
    const expectedAction = {
      data: store.error
    };
    expect(reducer({}, action)).toEqual(expectedAction);
  });
  it('should handle RATE_ARTICLE_FAILURE', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const action = {
      type: 'RATE_ARTICLE_FAILURE',
      error: store.error
    };
    const expectedAction = {
      data: store.error
    };
    expect(reducer({}, action)).toEqual(expectedAction);
  });
});
describe('Reducers test', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual([]);
  });
  it('should handle GET_RATE_SUCCESS', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const action = {
      type: 'GET_RATE_SUCCESS',
      post: store.articles,
    };
    expect(userReducer({}, action)).toEqual(action.post);
  });
  it('should handle GET_RATE_FAILURE', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const action = {
      type: 'GET_RATE_FAILURE',
      post: store.error,
    };
    expect(userReducer({}, action)).toEqual(action.post);
  });
});
