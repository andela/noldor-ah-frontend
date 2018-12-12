/* eslint-disable require-jsdoc */
export default function featureRelatedReducer(state = [], action) {
  switch (action.type) {
  case 'LOAD_RELATED_SUCCESS':
    return action.articles;
  case 'LOAD_RELATED_FAILURE':
    return action.error;
  default:
    return state;
  }
}
