import Axios from 'axios';
import { notifySuccess, notifyError } from '../notification/notificationAction';
import {
  SIGNUP_BEGIN,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from '../../types/signup';


export const signupBegin = () => ({
  type: SIGNUP_BEGIN,
});

export const signupSuccess = user => ({
  type: SIGNUP_SUCCESS,
  payload: user,
});

export const signupError = error => ({
  type: SIGNUP_ERROR,
  payload: error,
});

/**
 *
 * @param {*} user
 * @returns { object } object
 */
export const signupRequest = (user) => {
  return (dispatch) => {
    dispatch(signupBegin());

    return Axios.post('https://noldor-ah-backend-staging.herokuapp.com/api/v1/users/register', user)
      .then((response) => {
        dispatch(notifySuccess(response.data.user.message));
        dispatch(signupSuccess(response.data.user));
        return SIGNUP_SUCCESS;
      })
      .catch((error) => {
        dispatch(notifyError(error.response.data.message));
        dispatch(signupError(error.response.data.message));
        return SIGNUP_ERROR;
      });
  };
};
