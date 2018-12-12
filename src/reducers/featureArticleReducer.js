/* eslint-disable require-jsdoc */
export default function featureArticleReducer(state = [], action) {
  switch (action.type) {
  case 'LOAD_FEATURE_SUCCESS':
    return action.articles;
  case 'LOAD_FEATURE_FAILURE':
    return action.error;
  default:
    return state;
  }
}
