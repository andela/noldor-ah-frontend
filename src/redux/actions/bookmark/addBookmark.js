import axios from 'axios';
import store from '../../store/index';
import {
  ADD_BOOKMARK_FAILURE,
  ADD_BOOKMARK_REQUEST,
  ADD_BOOKMARK_SUCCESS
} from '../../types/bookmark';

export const addBookmarkSuccess = (message) => {
  return { type: ADD_BOOKMARK_SUCCESS, message };
};
export const addBookmarkFailure = (error) => {
  return {
    type: ADD_BOOKMARK_FAILURE, error
  };
};
export const addBookmarkRequest = () => {
  return { type: ADD_BOOKMARK_REQUEST };
};

export const addBookmark = slug => async (dispatch) => {
  const userToken = await store.getState().login.token;
  const request = axios({
    method: 'POST',
    url: `https://noldor-ah-backend-staging.herokuapp.com/api/v1/articles/${slug}/bookmarks`,
    headers: { 'x-token': userToken }
  });
  dispatch(addBookmarkRequest);
  return request.then(
    (response) => {
      dispatch(addBookmarkSuccess(response.data.message));
    },
    err => dispatch(addBookmarkFailure(err))
  );
};
