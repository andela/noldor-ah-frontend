/**
 * @description reducer
 * @param { array } state
 * @param { object } action
 * @returns { object }
 */
export default function rateArticleReducer(state = [], action) {
  switch (action.type) {
  case 'RATE_ARTICLE_SUCCESS':
    return {
      ...state,
      rating: action.rating
    };
  case 'RATE_ARTICLE_FAILURE':
    return {
      ...state,
      error: action.error
    };
  default:
    return state;
  }
}
