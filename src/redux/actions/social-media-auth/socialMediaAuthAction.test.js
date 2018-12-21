import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './socialMediaAuthAction';
import * as types from '../../types/socialMediaAuthType';
import { LOGIN_SUCCESS } from '../../types/login';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const expectedAction = {};
const mock = new MockAdapter(Axios);

describe('Actions on social media login', () => {
  it('should handle social auth begin', () => {
    expectedAction.type = types.SOCIAL_AUTH_BEGIN;
    expect(actions.socialAuthBegin()).toEqual(expectedAction);
  });

  it('should handle social auth success', () => {
    expectedAction.type = LOGIN_SUCCESS;
    expectedAction.payload = {
      foo: 'foo',
      bar: 'bar',
    };
    expect(actions.loginSuccess({ foo: 'foo', bar: 'bar' }))
      .toEqual(expectedAction);
  });

  it('should handle social auth success', () => {
    expectedAction.type = types.SOCIAL_AUTH_SUCCESS;
    expectedAction.payload = {
      foo: 'foo',
      bar: 'bar',
    };
    expect(actions.socialAuthSuccess({ foo: 'foo', bar: 'bar' }))
      .toEqual(expectedAction);
  });

  it('should handle social auth failure', () => {
    expectedAction.type = types.SOCIAL_AUTH_FAILURE;
    expectedAction.payload = 'error';
    expect(actions.socialAuthFailure('error')).toEqual(expectedAction);
  });

  it('should handle setting providers', () => {
    const store = mockStore({});
    expectedAction.type = types.SOCIALMEDIA_PROVIDER;

    const expectedActions = [{
      type: types.SOCIALMEDIA_PROVIDER,
      payload: 'google'
    }];
    store.dispatch(actions.setProvider('google'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  describe('Calling the auth to the backend', () => {
    afterEach(() => {
      mock.reset();
    });
    it('should dispatch SOCIAL_AUTH_BEGIN and SOCIAL_AUTH_FAILURE with social media', () => {
      mock
        .onGet('https://noldor-ah-backend-staging.herokuapp.com/api/v1/')
        .reply(400, {});
      const expectAction = [
        {
          type: types.SOCIAL_AUTH_BEGIN
        },
        {
          type: types.SOCIAL_AUTH_FAILURE,
          payload: undefined
        }
        // {
        //   type: types.LOGIN_SUCCESS,
        //   payload: mockData.loginCallBack
        // }
      ];
      const url = 'accessTokenandsomeotherverylongstringsfromgoogle';
      const store = mockStore({ user: {} });
      return store.dispatch(actions.handleSocialMediaAuth(url)).then(() => {
        expect(store.getActions()).toEqual(expectAction);
      });
    });

    it('should dispatch SOCIAL_AUTH_BEGIN and SOCIAL_AUTH_SUCCESS with social media', () => {
      const initialState = {
        provider: null,
        user: {},
        loading: false,
        success: false,
        error: null,
        token: null,
      };
      const store = mockStore(initialState);
      const url = '/auth?accessTokenstringfromgoogle';
      const mockData = {
        socialMediaAuth: {
          message: 'Google login successful',
          success: true,
          token: 'token',
          user: {
            id: 'id',
            email: 'email',
            username: 'username'
          }
        },
        loginCallBack: {
          error: null,
          id: 'id',
          loading: false,
          success: true,
          token: 'token'
        }
      };
      mock
        .onGet(url)
        .reply(200, mockData.socialMediaAuth);
      return store.dispatch(actions.handleSocialMediaAuth(url))
        .then(() => store.getActions());
    });
  });
});
