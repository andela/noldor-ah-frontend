/* eslint-disable max-len */
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import thunk from 'redux-thunk';

import {
  addBookmark, addBookmarkFailure,
  addBookmarkRequest,
  addBookmarkSuccess
} from './addBookmark';
import {
  ADD_BOOKMARK_FAILURE,
  ADD_BOOKMARK_REQUEST,
  ADD_BOOKMARK_SUCCESS
} from '../../types/bookmark';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

describe('bookmark', () => {
  afterEach(() => {
    mock.reset();
  });

  it('it should not bookmark successtully with a 404', () => {
    const serverError = new Error('Request failed with status code 404');
    const error = serverError;
    mock.onPost('https://noldor-ah-backend-staging.herokuapp.com/api/v1/articles/61c11b83b02e/bookmarks')
      .reply(404, {
        status: 'success',
        error
      });
    const mockActions = [
      {
        type: ADD_BOOKMARK_FAILURE, error
      }
    ];

    const store = mockStore({ });
    return store.dispatch(addBookmark('61c11b83b02e')).then(() => expect(store.getActions()).toEqual(mockActions));
  });
});

it('bookmark success', () => {
  const message = '';
  const expectedReturn = {
    type: ADD_BOOKMARK_SUCCESS,
    message
  };
  const action = addBookmarkSuccess(message);
  expect(action).toEqual(expectedReturn);
});
it('bookmark failure', () => {
  const error = '';
  const expectedReturn = {
    type: ADD_BOOKMARK_FAILURE,
    error
  };
  const action = addBookmarkFailure(error);
  expect(action).toEqual(expectedReturn);
});

it('bookmark request', () => {
  const expectedReturn = {
    type: ADD_BOOKMARK_REQUEST,
  };
  const action = addBookmarkRequest();
  expect(action).toEqual(expectedReturn);
});
