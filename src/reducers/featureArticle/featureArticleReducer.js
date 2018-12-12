/* eslint-disable require-jsdoc */

export const initialState = {
  article: {},
  isLoading: false,
};
export default function featureArticleReducer(state = initialState, action) {
  switch (action.type) {
  case 'LOAD_FEATURE_REQUEST':
    return {
      ...state,
      isLoading: true
    };
  case 'LOAD_FEATURE_SUCCESS':
    return {
      ...state,
      article: action.articles,
      isLoading: false,
    };

  case 'LOAD_FEATURE_FAILURE':
    return {
      ...state,
      isLoading: false,
      error: action.error
    };
  default:
    return state;
  }
}
