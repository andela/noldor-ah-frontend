import * as actions from '../../redux/actions/login/loginAction';
import store from '../../redux/store';
import isLoggedIn from './isLoggedIn';

describe('isLoggedIn works as expected', () => {
  it('should return true when a token exists', () => {
    store.dispatch(actions.loginSuccess({ id: 'id', token: 'token' })); // login fake user
    expect(isLoggedIn()).toBe(true);
  });

  it('should return false when a token does not exist', () => {
    store.dispatch(actions.logoutRequest()); // logout fake user
    expect(isLoggedIn()).toBe(false);
  });
});
