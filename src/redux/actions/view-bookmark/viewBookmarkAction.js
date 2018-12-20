import axios from 'axios';
import store from '../../store/index';

import {
  VIEW_BOOKMARK_FAILURE,
  VIEW_BOOKMARK_REQUEST,
  VIEW_BOOKMARK_SUCCESS
} from '../../types/viewBookmark';

export const viewBookmarkSuccess = (bookmarks) => {
  return {
    type: VIEW_BOOKMARK_SUCCESS, bookmarks
  };
};

export const viewBookmarkFailure = (error) => {
  return {
    type: VIEW_BOOKMARK_FAILURE, error
  };
};

export const viewBookmarkRequest = () => {
  return {
    type: VIEW_BOOKMARK_REQUEST
  };
};
export const viewBookmark = () => async (dispatch) => {
  const userToken = await store.getState().login.token;
  const request = axios({
    method: 'GET',
    url: 'https://noldor-ah-backend-staging.herokuapp.com/api/v1/users/articles/bookmarks',
    headers: { 'x-token': userToken }
  });

  dispatch(viewBookmarkRequest);
  return request.then(
    (response) => {
      dispatch(viewBookmarkSuccess(response.data.userBookmarks));
    },
    err => dispatch(viewBookmarkFailure(err))
  );
};
