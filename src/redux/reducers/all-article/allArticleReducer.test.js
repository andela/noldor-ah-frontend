import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import reducer from './allArticleReducer';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Reducers test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });
  it('should handle LOAD_ARTICLE_SUCCESS', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const action = {
      type: 'LOAD_ARTICLE_SUCCESS',
      post: store.articles,
    };
    expect(reducer({}, action)).toEqual(action.post);
  });
  it('should handle LOAD_ARTICLE_FAILURE', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const action = {
      type: 'LOAD_ARTICLE_FAILURE',
      post: store.error,
    };
    expect(reducer({}, action)).toEqual(action.post);
  });
});
