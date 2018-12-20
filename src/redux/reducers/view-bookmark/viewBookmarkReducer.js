/* eslint-disable require-jsdoc */
import {
  VIEW_BOOKMARK_FAILURE,
  VIEW_BOOKMARK_REQUEST,
  VIEW_BOOKMARK_SUCCESS
} from '../../types/viewBookmark';

export const initialState = {
  bookmarks: [],
  isLoading: false
};
export default function viewBookmarkReducer(state = initialState, action) {
  switch (action.type) {
  case VIEW_BOOKMARK_FAILURE:
    return {
      ...state,
      isLoading: false,
      error: action.error
    };
  case VIEW_BOOKMARK_REQUEST:
    return {
      ...state,
      isLoading: true
    };
  case VIEW_BOOKMARK_SUCCESS:
    return {
      ...state,
      isLoading: false,
      bookmarks: action.bookmarks
    };
  default:
    return state;
  }
}
