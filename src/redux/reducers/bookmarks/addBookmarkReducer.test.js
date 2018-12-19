import bookmark, { initialState } from './addBookmarkReducer';
import {
  ADD_BOOKMARK_FAILURE,
  ADD_BOOKMARK_REQUEST,
  ADD_BOOKMARK_SUCCESS
} from '../../types/bookmark';

describe('test book article reducer', () => {
  it('it should return an object', () => {
    const action = {
      type: ADD_BOOKMARK_FAILURE,
      error: ''
    };
    const action1 = {
      type: ADD_BOOKMARK_REQUEST
    };
    const action2 = {
      type: ADD_BOOKMARK_SUCCESS,
      message: ''
    };
    const state = { message: '' };

    expect(bookmark(initialState, action)).toEqual({ ...state, error: '' });
    expect(bookmark(initialState, action1)).toEqual({ ...state });
    expect(bookmark(initialState, action2)).toEqual({ ...state, message: '' });
  });
});
