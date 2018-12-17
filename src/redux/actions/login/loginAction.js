import Axios from 'axios';
import {
  LOGIN_BEGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT
} from '../../types/login';
import { notifySuccess, notifyError } from '../notification/notificationAction';

export const loginBegin = () => ({ type: LOGIN_BEGIN });
export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: user,
});
export const loginError = error => ({
  type: LOGIN_ERROR,
  payload: error,
});
const logout = () => ({ type: LOGOUT });

/**
 *
 * @param {object} user to be logged in
 * @returns {object} a promise that resolves to an object
 */
export const loginRequest = (user) => {
  return (dispatch) => {
    dispatch(loginBegin());

    return Axios.post('https://noldor-ah-backend-staging.herokuapp.com/api/v1/users/login', user)
      .then((response) => {
        dispatch(notifySuccess(response.data.message));
        dispatch(loginSuccess(response.data));
        return LOGIN_SUCCESS;
      })
      .catch((error) => {
        dispatch(notifyError(error.response.data.message));
        dispatch(loginError(error.response.data.message));
        return LOGIN_ERROR;
      });
  };
};

export const logoutRequest = () => dispatch => dispatch(logout());
