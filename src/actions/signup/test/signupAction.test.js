import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from '../signupAction';
import * as types from '../../../types/signup';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('signup Actions', () => {
  it('should dispatch SIGNUP_BEGIN and SIGNUP_ERROR when signupRequest fails', () => {
    const mock = new MockAdapter(Axios);
    mock.onPost('https://noldor-ah-backend-staging.herokuapp.com/api/v1/users/register')
      .reply(400, { message: 'error' });

    const user = {
      email: 'anasey@outlook.com',
      username: 'anasey',
      password: 'password123',
      confirmPassword: 'password123',
    };
    const expectedActions = [
      { type: types.SIGNUP_BEGIN },
      { type: 'NOTIFY_ERROR', message: 'error' },
      { type: types.SIGNUP_ERROR, payload: 'error' },
    ];
    const store = mockStore({ user: {} });
    return store.dispatch(actions.signupRequest(user)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch SIGNUP_BEGIN and SIGNUP_SUCCESS when signupRequest is successful', () => {
    const mock = new MockAdapter(Axios);
    const mockData = {
      message: 'success',
      user: {
        email: 'anasey001@outlook.com',
        username: 'anasey001',
        password: 'password123',
        confirmPassword: 'password123',
      },
    };
    mock.onPost()
      .reply(200, mockData);

    const user = {
      email: 'anasey001@outlook.com',
      username: 'anasey001',
      password: 'password123',
      confirmPassword: 'password123',
    };
    const expectedActions = [
      { type: types.SIGNUP_BEGIN },
      { type: 'NOTIFY_SUCCESS' },
      { type: types.SIGNUP_SUCCESS, payload: user },
    ];
    const store = mockStore({ user: {} });
    return store.dispatch(actions.signupRequest(user)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
