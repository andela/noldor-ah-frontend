/* eslint-disable require-jsdoc */
import axios from 'axios';

export function loadAnArticleSuccess(article) {
  return { type: 'LOAD_AN_ARTICLE_SUCCESS', article };
}

export const loadingAnArticleRequest = () => {
  return { type: 'LOAD_AN_ARTICLE_REQUEST' };
};

export function loadAnArticleFailure(error) {
  return { type: 'LOAD_AN_ARTICLE_FAILURE', error };
}

export const loadAnArticle = slug => (dispatch) => {
  const request = axios({
    method: 'GET',
    url: `https://noldor-ah-backend-staging.herokuapp.com/api/v1/articles/${slug}`,
    headers: []
  });
  dispatch(loadingAnArticleRequest());
  return request.then(
    (response) => {
      const { article } = response.data;
      dispatch(loadAnArticleSuccess(article));
    },
    err => dispatch(loadAnArticleFailure(err))
  );
};
