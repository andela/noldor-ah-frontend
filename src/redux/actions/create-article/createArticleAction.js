import Axios from 'axios';
import { notifySuccess, notifyError } from '../notification/notificationAction';
import {
  CREATE_DRAFT_SUCCESS,
  CREATE_DRAFT_ERROR,
  CREATE_ARTICLE_ERROR,
  CREATE_ARTICLE_BEGIN,
} from '../../types/createArticle';
import store from '../../store/index';

export const triggerDraftSuccess = article => ({
  type: CREATE_DRAFT_SUCCESS,
  payload: article,
});

export const triggerDraftError = error => ({
  type: CREATE_DRAFT_ERROR,
  payload: error,
});


export const createArticleBegin = () => ({
  type: CREATE_ARTICLE_BEGIN,
});


export const createArticleError = error => ({
  type: CREATE_ARTICLE_ERROR,
  payload: error,
});

export const createArticleDraft = (article, slug) => {
  const { token } = store.getState().login;
  const draftUrl = 'https://noldor-ah-backend-staging.herokuapp.com/api/v1/articles';
  const editUrl = `https://noldor-ah-backend-staging.herokuapp.com/api/v1/articles/${slug}`;
  const url = slug ? editUrl : draftUrl;
  const method = slug ? 'PUT' : 'POST';
  return (dispatch) => {
    return Axios({
      method,
      url,
      data: article,
      headers: {
        'x-token': token,
      }
    })
      .then((response) => {
        dispatch(notifySuccess(response.data.message));
        dispatch(triggerDraftSuccess(response.data.article));
        return response;
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data) {
            const obj = error.response.data.error;
            dispatch(notifyError(obj[Object.keys(obj)[0]]));
            dispatch(triggerDraftError(obj[Object.keys(obj)[0]]));
            return CREATE_DRAFT_ERROR;
          }
          return CREATE_DRAFT_ERROR;
        }
      });
  };
};

export const createArticle = (article, slug) => {
  const { token } = store.getState().login;
  return (dispatch) => {
    dispatch(createArticleBegin());

    return Axios({
      method: 'PUT',
      url: `https://noldor-ah-backend-staging.herokuapp.com/api/v1/articles/${slug}/publish`,
      headers: {
        'x-token': token,
      },
      data: article,
    })
      .then((response) => {
        dispatch(notifySuccess(response.data.message));
      })
      .catch((error) => {
        dispatch(notifyError(error.response.data.message));
        dispatch(createArticleError(error.response.data.message));
      });
  };
};
