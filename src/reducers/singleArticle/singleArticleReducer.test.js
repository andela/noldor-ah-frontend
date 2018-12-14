import anArticle, { initialState } from './singleArticleReducer';


describe('test feature article reducer', () => {
  it('it should return an object', () => {
    const action = {
      type: 'LOAD_AN_ARTICLE_REQUEST'
    };
    const action1 = {
      type: 'LOAD_AN_ARTICLE_SUCCESS'
    };
    const action2 = {
      type: 'LOAD_AN_ARTICLE_FAILURE'
    };
    const state = {
      article: {}
    };
    expect(anArticle(initialState, action)).toEqual({ ...state, isLoading: true });
    expect(anArticle(initialState, action1)).toEqual({ isLoading: false });
    expect(anArticle(initialState, action2)).toEqual({ ...state, isLoading: false });
    expect(anArticle(initialState, '')).toEqual({ ...initialState });
  });
});
