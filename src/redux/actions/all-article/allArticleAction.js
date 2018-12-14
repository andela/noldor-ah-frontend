/* eslint-disable max-len */
import axios from 'axios';

/**
 * @param {*} articles
 * @returns object
 */
export function loadAllArticlesSucess(articles) {
  return {
    type: 'LOAD_ARTICLE_SUCCESS',
    articles
  };
}

/**
 * @param {*} error
 * @returns object
 */
export function loadAllArticlesFailure(error) {
  return {
    type: 'LOAD_ARTICLE_FAILURE',
    error
  };
}

const DEFAULT_ARTICLES_PER_PAGE = 9;
export const loadAllArticles = (page = 1) => async (dispatch) => {
  try {
    const request = await axios({
      method: 'GET',
      url: `https://noldor-ah-backend-staging.herokuapp.com/api/v1/articles/limit/${DEFAULT_ARTICLES_PER_PAGE}/page/${page}`
    });
    localStorage.setItem('pageInfo', request.data.message);
    localStorage.setItem('message', request.data.message.split('of')[1].trim());
    return dispatch(loadAllArticlesSucess(request.data.result));
  } catch (err) {
    return dispatch(loadAllArticlesFailure(err.response));
  }
};
