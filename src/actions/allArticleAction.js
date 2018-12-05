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

export const loadAllArticle = () => (dispatch) => {
  const request = axios({
    method: 'GET',
    url: 'https://noldor-ah-backend-staging.herokuapp.com/api/v1/articles',
    headers: []
  });

  return request.then(
    (response) => {
      console.log(response.data.articles);
      // const articleLength = response.data.articles.length;
      dispatch(loadAllArticlesSucess(response.data.articles));
    },
    err => dispatch(loadAllArticlesFailure(err))
  );
};
