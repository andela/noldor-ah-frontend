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

export const loadAllArticles = (page = 1) => async (dispatch) => {
  try {
    const request = await axios({
      method: 'GET',
      url: `https://noldor-ah-backend-staging.herokuapp.com/api/v1/articles/limit/${9}/page/${page}`
    });
    localStorage.setItem('message', request.data.message.split('of')[1].trim());
    return dispatch(loadAllArticlesSucess(request.data.result));
  } catch (err) {
    return dispatch(loadAllArticlesFailure(err.response));
  }
};
