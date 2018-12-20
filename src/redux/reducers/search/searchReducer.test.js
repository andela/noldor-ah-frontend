import searchReducer from './searchReducer';
import * as types from '../../types/search';

const state = {
  categories: [],
  authors: [],
  request: null,
  results: [],
  loading: true,
};
const keywords = {
  keywords: 'michael jr'
};

describe('searchReducer tests', () => {
  it('should return the initial state', () => {
    expect(searchReducer(undefined, {})).toEqual(state);
  });

  it('should handle SET_KEYWORD', () => {
    state.request = keywords;

    expect(searchReducer(state, {
      type: types.SET_KEYWORD,
      payload: keywords,
    })).toEqual(state);
  });

  it('should handle CATEGORIES_LOADED', () => {
    state.loading = false;
    state.categories = ['categories'];

    expect(searchReducer(state, {
      type: types.CATEGORIES_LOADED,
      payload: ['categories'],
    })).toEqual(state);
  });

  it('should handle AUTHORS_LOADED', () => {
    state.loading = false;
    state.authors = ['authors'];

    expect(searchReducer(state, {
      type: types.AUTHORS_LOADED,
      payload: ['authors'],
    })).toEqual(state);
  });

  it('should handle SEARCH_BEGIN', () => {
    state.loading = true;
    state.request = keywords;

    expect(searchReducer(state, {
      type: types.SEARCH_BEGIN,
      payload: keywords,
    })).toEqual(state);
  });

  it('should handle SEARCH_SUCCESS', () => {
    state.loading = false;
    state.results = [{ foo: 'bar' }];

    expect(searchReducer(state, {
      type: types.SEARCH_SUCCESS,
      payload: state.results,
    })).toEqual(state);
  });

  it('should handle SEARCH_FAILURE', () => {
    state.results = [];

    expect(searchReducer(state, {
      type: types.SEARCH_FAILURE,
    })).toEqual(state);
  });
});
