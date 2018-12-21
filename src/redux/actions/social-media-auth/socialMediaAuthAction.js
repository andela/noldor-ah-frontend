import Axios from 'axios';
import {
  SOCIAL_AUTH_BEGIN,
  SOCIAL_AUTH_SUCCESS,
  SOCIAL_AUTH_FAILURE,
  SOCIALMEDIA_PROVIDER
} from '../../types/socialMediaAuthType';
import { LOGIN_SUCCESS } from '../../types/login';

export const socialAuthBegin = () => ({
  type: SOCIAL_AUTH_BEGIN
});

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const socialAuthSuccess = user => ({
  type: SOCIAL_AUTH_SUCCESS,
  payload: user
});

export const socialAuthFailure = error => ({
  type: SOCIAL_AUTH_FAILURE,
  payload: error
});

export const provider = prov => ({
  type: SOCIALMEDIA_PROVIDER,
  payload: prov
});

export const setProvider = (prov) => {
  return (dispatch) => {
    dispatch(provider(prov));
  };
};

/**
 *
 * @param {object} user to be logged in through social media
 * @returns {object} a promise that resolves to an object
 */

export const handleSocialMediaAuth = (url) => {
  return (dispatch) => {
    dispatch(socialAuthBegin());
    return Axios.get(`https://noldor-ah-backend-staging.herokuapp.com/api/v1${url}`)
      .then((response) => {
        // console.log(response);
        const {
          data
        } = response.data;
        const loginObj = {
          token: data.token,
          id: data.user.id,
        };
        // localStorage.setItem('x-token', data.token);
        // localStorage.setItem('id', JSON.stringify(data.user.id));
        dispatch(socialAuthSuccess(response.data));
        dispatch(loginSuccess(loginObj));
        return SOCIAL_AUTH_SUCCESS;
      })
      .catch((error) => {
        dispatch(socialAuthFailure(error.response.message));
        return SOCIAL_AUTH_FAILURE;
      });
  };
};
