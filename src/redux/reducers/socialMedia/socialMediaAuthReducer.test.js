import socialMediaUserReducer from './socialMediaAuthReducer';
import * as types from '../../types/socialMediaAuthType';

const state = {
  provider: null,
  user: {},
  loading: false,
  success: false,
  error: null,
  token: null,
};

describe('Social media login reducers', () => {
  it('should return the initial state of the object', () => {
    expect(socialMediaUserReducer(undefined, {})).toEqual(state);
  });

  it('should handle SOCIAL_AUTH_BEGIN', () => {
    state.loading = true;

    expect(socialMediaUserReducer(state, {
      type: types.SOCIAL_AUTH_BEGIN,
    })).toEqual(state);
  });

  it('should handle SOCIAL_AUTH_SUCCESS', () => {
    state.loading = false;
    state.success = true;
    state.id = 'something';
    state.token = 'token';
    state.user = {
      id: 1,
      email: 'something@gmail.com',
      username: 'tester'
    };

    expect(socialMediaUserReducer(state, {
      type: types.SOCIAL_AUTH_SUCCESS,
      payload: {
        token: 'token',
        user: {
          id: 1,
          email: 'something@gmail.com',
          username: 'tester'
        }
      },
    })).toEqual(state);
  });

  it('should handle SOCIAL_AUTH_FAILURE', () => {
    state.loading = false;
    state.success = false;
    state.id = null;
    state.token = null;
    state.error = 'error';

    expect(socialMediaUserReducer(state, {
      type: types.SOCIAL_AUTH_FAILURE,
      payload: 'error'
    })).toEqual(state);
  });

  it('should handle SOCIALMEDIA_PROVIDER', () => {
    state.provider = undefined;

    expect(socialMediaUserReducer(state, {
      type: types.SOCIALMEDIA_PROVIDER,
    })).toEqual(state);
  });
});
