import React from 'react';
import { shallow } from 'enzyme';
import PublicRoute from './publicRoute';
import * as actions from '../../redux/actions/login/loginAction';
import store from '../../redux/store';

describe('PublicRoute tests', async () => {
  const PublicComponent = () => <div>Smurfs</div>;

  it('redirects when the user is logged in', () => {
    store.dispatch(actions.loginSuccess({ id: 'id', token: 'token' })); // login fake user

    const wrapper = shallow(
      <PublicRoute path="/public" component={PublicComponent} />
    );

    expect(wrapper.find('Redirect').exists()).toBe(true);

    store.dispatch(actions.logoutRequest()); // logout fake user
  });

  it('renders the component when the user is logged out', () => {
    const wrapper = shallow(
      <PublicRoute path="/public" component={PublicComponent} />
    );

    expect(wrapper.find('Route').exists()).toBe(true);
  });
});
