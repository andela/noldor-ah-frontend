import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { ConnectedLogout, mapDispatchToProps } from './Logout';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Logout shallow rendering tests', () => {
  const props = {
    store: mockStore({ isLoggedOut: false }),
    logout: jest.fn(),
    history: {
      push: jest.fn(),
    },
  };

  const wrapper = shallow(
    <ConnectedLogout
      {...props}
    />
  );

  it('should map logout() to props', () => {
    expect(mapDispatchToProps(props.logout)).toBeTruthy();
  });

  it('should call logout() on mount', () => {
    wrapper.instance().componentDidMount();
    expect(props.logout.mock.calls.length).toBe(1);
  });

  it('should call history.push() on mount', () => {
    wrapper.instance().componentDidMount();
    expect(props.history.push.mock.calls.length).toBe(1);
  });
});
