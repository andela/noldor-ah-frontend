/* eslint-disable max-len */
import axios from 'axios';

/**
 * @param {*} rating
 * @returns object
 */
export function rateArticleSuccess(rating) {
  return {
    type: 'RATE_ARTICLE_SUCCESS',
    rating
  };
}

/**
 * @param {*} error
 * @returns object
 */
export function rateArticleFailure(error) {
  return {
    type: 'RATE_ARTICLE_FAILURE',
    error
  };
}

export const rateArticles = data => async (dispatch) => {
  try {
    const request = await axios({
      method: 'POST',
      url: `https://noldor-ah-backend-staging.herokuapp.com/api/v1/articles/ratings/${data.id}`,
      data: {
        rateValue: data.rateValue
      },
      headers: {
        'x-token': localStorage.getItem('token')
      }
    });
    return await dispatch(rateArticleSuccess(request.data.result));
  } catch (err) {
    return dispatch(rateArticleFailure(err.response.data));
  }
};
