import axios from 'axios';
import {
  GET_USER_PROFILE_START,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE
} from '../../types/profileTypes';

/**
 * @param {*} bool this shows when the page is just laoding
 * @returns object
 */
export const getProfileBegins = () => ({
  type: GET_USER_PROFILE_START
});

/**
 * @param {*} user when user has been fetched
 * @returns object
 */
export const getProfileSuccess = user => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: user
});

/**
 * @param {*} error when a problem is encountered.
 * @returns object
 */
export const getProfileFailure = error => ({
  type: GET_USER_PROFILE_FAILURE,
  paylaod: error
});

/**
 * @param {object} userId detail should be gotten when for profile has been loaded
 * @returns {object} a promise that resolves to an object
 */
export const handleGetProfile = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(getProfileBegins());
      const getUser = await axios.get(
        `https://noldor-ah-backend-staging.herokuapp.com/api/v1/users/${userId}/profiles`
      );
      dispatch(getProfileSuccess(getUser.data.data));
      return GET_USER_PROFILE_SUCCESS;
    } catch (error) {
      dispatch(getProfileFailure(error.response.message));
      return GET_USER_PROFILE_FAILURE;
    }
  };
};
