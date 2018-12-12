/* eslint-disable require-jsdoc */
export const initialState = {
  articles: [],
  isLoading: false,
};
export default function featureRelatedReducer(state = initialState, action) {
  switch (action.type) {
  case 'LOAD_RELATED_REQUEST':
    return {
      ...state,
      isLoading: true
    };
  case 'LOAD_RELATED_SUCCESS':
    return {
      ...state,
      articles: action.articles,
      isLoading: false
    };
  case 'LOAD_RELATED_FAILURE':
    return {
      ...state,
      isLoading: false,
      error: action.error
    };
  default:
    return state;
  }
}
