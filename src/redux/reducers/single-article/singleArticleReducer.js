/* eslint-disable require-jsdoc */
export const initialState = {
  article: {},
  isLoading: false,
};
export default function anArticleReducer(state = initialState, action) {
  switch (action.type) {
  case 'LOAD_AN_ARTICLE_REQUEST':
    return {
      ...state,
      isLoading: true
    };
  case 'LOAD_AN_ARTICLE_SUCCESS':
    return {
      ...state,
      article: action.article,
      isLoading: false
    };
  case 'LOAD_AN_ARTICLE_FAILURE':
    return {
      ...state,
      isLoading: false,
      error: action.error
    };
  default:
    return state;
  }
}
