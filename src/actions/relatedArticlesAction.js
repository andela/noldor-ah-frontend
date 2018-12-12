/* eslint-disable require-jsdoc */
import axios from 'axios';

export function loadRelatedSuccess(articles) {
  return { type: 'LOAD_RELATED_SUCCESS', articles };
}

export const loadingRelatedRequest = () => {
  return { type: 'LOAD_RELATED_REQUEST' };
};
export function loadRelatedFailure(error) {
  return { type: 'LOAD_RELATED_FAILURE', error };
}

export const loadRelatedArticles = () => (dispatch) => {
  const request = axios({
    method: 'GET',
    url: 'https://noldor-ah-backend-staging.herokuapp.com/api/v1/articles',
    headers: []
  });
  dispatch(loadingRelatedRequest());
  return request.then(
    (response) => {
      const { articles } = response.data;
      const related = articles.filter(x => x.ratings >= 4);
      const shuffleArticle = related.sort(() => { return 0.6 - Math.random(); });
      const sortedArticles = shuffleArticle.slice(0, 3);

      dispatch(loadRelatedSuccess(sortedArticles));
    },
    err => dispatch(loadRelatedFailure(err))
  );
};
