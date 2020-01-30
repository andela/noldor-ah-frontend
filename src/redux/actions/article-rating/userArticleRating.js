/* eslint-disable max-len */
import axios from 'axios';

/**
 * @param {*} rating
 * @returns object
 */
export function getUserRatingSuccess(rating) {
  return {
    type: 'GET_RATE_SUCCESS',
    rating
  };
}

/**
 * @param {*} error
 * @returns object
 */
export function getUserRatingFailure(error) {
  return {
    type: 'GET_RATE_FAILURE',
    error
  };
}

export const getUserRating = id => async (dispatch) => {
  try {
    const request = await axios({
      method: 'GET',
      url: `https://noldor-ah-backend-staging.herokuapp.com/api/v1/articles/ratings/${id}`,
      headers: {
        'x-token': localStorage.getItem('token')
      }
    });
    const value = request.data.data.ratings;
    localStorage.setItem('rate', value);
    return await dispatch(getUserRatingSuccess(value));
  } catch (error) {
    localStorage.setItem('rate', 0);
    return dispatch(getUserRatingFailure(null));
  }
};
