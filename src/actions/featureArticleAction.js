/* eslint-disable require-jsdoc */
import axios from 'axios';

export function loadFeatureSuccess(articles) {
  return { type: 'LOAD_FEATURE_SUCCESS', articles };
}
export function loadFeatureFailure(error) {
  return { type: 'LOAD_FEATURE_FAILURE', error };
}

export const loadFeatureArticle = () => (dispatch) => {
  const request = axios({
    method: 'GET',
    url: 'https://noldor-ah-backend-staging.herokuapp.com/api/v1/articles',
    headers: []
  });

  return request.then(
    (response) => {
      // console.log(response.data.articles.length);
      const articleLength = response.data.articles.length;
      const no = Math.floor((Math.random() * articleLength));
      dispatch(loadFeatureSuccess(response.data.articles[no]));
    },
    err => dispatch(loadFeatureFailure(err))
  );
};
