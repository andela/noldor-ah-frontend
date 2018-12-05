/**
 * @description reducer
 * @param { array } state
 * @param { object } action
 * @returns { object }
 */
export default function allArticleReducer(state = [], action) {
  switch (action.type) {
  case 'LOAD_ARTICLE_SUCCESS':
    return action.articles;
  case 'LOAD_ARTICLE_FAILURE':
    return action.error;
  default:
    return state;
  }
}
