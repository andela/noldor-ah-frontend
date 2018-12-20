import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import createHistory from 'history/createMemoryHistory';
import Header from './Header';
import * as loginActions from '../../../redux/actions/login/loginAction';
import mainStore from '../../../redux/store/index';

const history = createHistory();
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const props = {
  history,
  handleBurger: jest.fn(),
};

describe('Header mount rendering tests', () => {
  let store;
  let wrapper;
  let instance;

  beforeEach(() => {
    store = mockStore({ });
    wrapper = mount(
      <MemoryRouter>
        <Header store={store} {...props} />
      </MemoryRouter>
    );
    instance = wrapper.find('Header').instance();
  });

  it('should render without crashing', () => {
    expect(wrapper.find('.nav').exists()).toBe(true);
  });

  it('handleBurger works as expected', () => {
    const event = {
      preventDefault: jest.fn(),
    };

    instance.handleBurger(event);
    expect(event.preventDefault).toBeCalledTimes(1);
  });

  it('searchInput works as expected', () => {
    const event = {
      key: 'Enter',
    };

    instance.searchInput(event);
    event.key = 'smurf';
    instance.searchInput(event);

    expect(instance.searchInput).toBeDefined();
  });

  it('expandLinks works as expected', () => {
    mainStore.dispatch(loginActions.loginSuccess({ id: 'id', token: 'token' }));

    instance.expandNavLinks();
    mainStore.dispatch(loginActions.logoutRequest());
  });
});
