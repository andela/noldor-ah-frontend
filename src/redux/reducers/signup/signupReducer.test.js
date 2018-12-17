import reducer from './signupReducer';
import * as types from '../../types/signup';

describe('signup reducers', () => {
  const state = {
    loading: false,
    success: false,
    error: null,
    user: null,
  };
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(state);
  });

  it('should handle SIGNUP_BEGIN', () => {
    state.loading = true;
    expect(reducer(state, {
      type: types.SIGNUP_BEGIN
    })).toEqual(state);
  });

  it('should handle SIGNUP_SUCCESS', () => {
    state.loading = false;
    state.error = null;
    state.user = 'oluseyi';
    expect(reducer(state, {
      type: types.SIGNUP_SUCCESS,
      payload: 'oluseyi',
    })).toEqual(state);
  });

  it('should handle SIGNUP_ERROR', () => {
    state.loading = false;
    state.error = 'Some Error Message';
    state.user = null;
    expect(reducer(state, {
      type: types.SIGNUP_ERROR,
      payload: 'Some Error Message',
    })).toEqual(state);
  });
});
