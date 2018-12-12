import feature, { initialState } from './relatedArticleReducer';


describe('test feature article reducer', () => {
  it('it should return an object', () => {
    const action = {
      type: 'LOAD_RELATED_REQUEST'
    };
    const action1 = {
      type: 'LOAD_RELATED_SUCCESS'
    };
    const action2 = {
      type: 'LOAD_RELATED_FAILURE'
    };
    const state = {
      articles: []
    };
    expect(feature(initialState, action)).toEqual({ ...state, isLoading: true });
    expect(feature(initialState, action1)).toEqual({ isLoading: false });
    expect(feature(initialState, action2)).toEqual({ ...state, isLoading: false });
    expect(feature(initialState, '')).toEqual({ ...initialState });
  });
});
