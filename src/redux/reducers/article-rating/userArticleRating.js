/**
 * @description reducer
 * @param { array } state
 * @param { object } action
 * @returns { object }
 */
export default function userArticleRatingReducer(state = [], action) {
  switch (action.type) {
  case 'GET_RATE_SUCCESS':
    return action.rating;
  case 'GET_RATE_FAILURE':
    return action.error;
  default:
    return state;
  }
}
