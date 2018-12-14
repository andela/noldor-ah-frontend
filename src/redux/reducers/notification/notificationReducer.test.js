import notificationReducer from './notificationReducer';
import * as types from '../../types/notification';

const state = {};

describe('notification reducer tests', () => {
  it('should return the initial state', () => {
    expect(notificationReducer(undefined, {})).toEqual(state);
  });

  it('should handle NOTIFY_SUCCESS', () => {
    state.type = 'success';
    state.message = 'successful';

    expect(notificationReducer(state, {
      type: types.NOTIFY_SUCCESS,
      message: 'successful',
    })).toEqual(state);
  });

  it('should handle NOTIFY_ERROR', () => {
    state.type = 'error';
    state.message = 'error';

    expect(notificationReducer(state, {
      type: types.NOTIFY_ERROR,
      message: 'error',
    })).toEqual(state);
  });

  it('should handle NOTIFY_CLEAR', () => {
    delete (state.type);
    delete (state.message);

    expect(notificationReducer(state, {
      type: types.NOTIFY_CLEAR,
    })).toEqual(state);
  });
});
