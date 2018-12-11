import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from '../loginAction';
import * as types from '../../../types/login';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const expectedAction = {};

describe('login actions test', () => {
  it('should handle LOGIN_BEGIN', () => {
    expectedAction.type = types.LOGIN_BEGIN;
    expect(actions.loginBegin()).toEqual(expectedAction);
  });

  it('should handle LOGIN_SUCCESS', () => {
    expectedAction.type = types.LOGIN_SUCCESS;
    expectedAction.payload = {
      foo: 'foo',
      bar: 'bar',
    };
    expect(actions.loginSuccess({ foo: 'foo', bar: 'bar' }))
      .toEqual(expectedAction);
  });

  it('should handle LOGIN_ERROR', () => {
    expectedAction.type = types.LOGIN_ERROR;
    expectedAction.payload = 'error';
    expect(actions.loginError('error'))
      .toEqual(expectedAction);
  });

  describe('async login actions test', () => {
    it('should dispatch LOGIN_BEGIN and LOGIN_SUCCESS when loginRequest is successful', () => {
      const mock = new MockAdapter(Axios);
      const mockData = {
        success: true,
        message: 'successfully logged in',
        token: 'token',
        id: 'id',
      };
      mock
        .onPost('https://noldor-ah-backend-staging.herokuapp.com/api/v1/users/login')
        .reply(200, mockData);

      const user = {
        email: 'papa@smurfs.com',
        password: 'GastricJuice',
      };

      const expectedActions = [
        { type: types.LOGIN_BEGIN },
        { message: 'successfully logged in', type: 'NOTIFY_SUCCESS' },
        { type: types.LOGIN_SUCCESS, payload: mockData },
      ];

      const store = mockStore({ user: {} });
      return store.dispatch(actions.loginRequest(user)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should dispatch LOGIN_BEGIN and LOGIN_ERROR when loginRequest fails', () => {
      const mock = new MockAdapter(Axios);
      const mockData = {
        success: false,
        message: 'email or password incorrect',
      };
      mock
        .onPost('https://noldor-ah-backend-staging.herokuapp.com/api/v1/users/login')
        .reply(400, mockData);

      const user = {
        email: 'papa@smurfs.com',
        password: 'GastricJuice',
      };

      const expectedActions = [
        { type: types.LOGIN_BEGIN },
        { message: 'email or password incorrect', type: 'NOTIFY_ERROR' },
        {
          type: types.LOGIN_ERROR,
          payload: mockData.message,
        },
      ];

      const store = mockStore({ user: {} });
      return store.dispatch(actions.loginRequest(user)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
