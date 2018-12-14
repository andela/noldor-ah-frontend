/* eslint-disable require-jsdoc */
import axios from 'axios';

export function loadFeatureSuccess(articles) {
  return { type: 'LOAD_FEATURE_SUCCESS', articles };
}


export const loadingFeatureRequest = () => {
  return { type: 'LOAD_FEATURE_REQUEST' };
};

export function loadFeatureFailure(error) {
  return { type: 'LOAD_FEATURE_FAILURE', error };
}

export const loadFeatureArticle = () => (dispatch) => {
  const request = axios({
    method: 'GET',
    url: 'https://noldor-ah-backend-staging.herokuapp.com/api/v1/articles',
    headers: []
  });
  dispatch(loadingFeatureRequest());
  return request.then(
    (response) => {
      const articleLength = response.data.articles.length;
      const no = Math.floor((Math.random() * articleLength));
      dispatch(loadFeatureSuccess(response.data.articles[no]));
    },
    err => dispatch(loadFeatureFailure(err))
  );
};
