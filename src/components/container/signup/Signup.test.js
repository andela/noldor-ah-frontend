import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Signup, { ConnectedSignup } from './Signup';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);


describe('<Signup />', () => {
  it('matches the snapshoot', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const wrapper = shallow(<Provider store={store}>
      <Signup/>
    </Provider>);
    expect(wrapper).toMatchSnapshot();
  });

  it('matches the snapshoot of signup Page', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const wrapper = shallow(<Provider store={store}>
      <ConnectedSignup />
    </Provider>);
    expect(wrapper).toMatchSnapshot();
  });

  it('render sigup page correctly', () => {
    const wrapper = shallow(<ConnectedSignup />);
    expect(wrapper.find('.signup-left').exists()).toBe(true);
    expect(wrapper.find('.signup-right').exists()).toBe(true);
    expect(wrapper.find('h2').text()).toBe('WELCOME');
    expect(wrapper.find('h2').length).toEqual(1);
    expect(wrapper.find('form input').length).toEqual(4);
  });

  it('should update states when data is passed', () => {
    const wrapper = mount(<ConnectedSignup />);
    const emailInput = wrapper.find('#email');
    emailInput.instance().value = 'anasey@outlook.com';
    emailInput.simulate('change');

    const usernameInput = wrapper.find('#username');
    usernameInput.instance().value = 'anasey001';
    usernameInput.simulate('change');

    const passwordInput = wrapper.find('#password');
    passwordInput.instance().value = 'password123';
    passwordInput.simulate('change');

    const confirmPasswordInput = wrapper.find('#confirmPassword');
    confirmPasswordInput.instance().value = 'password123';
    confirmPasswordInput.simulate('change');

    expect(wrapper.state()).toMatchObject({
      email: 'anasey@outlook.com',
      username: 'anasey001',
      password: 'password123',
      confirmPassword: 'password123',
    });
    wrapper.unmount();
  });

  it('should submit inputs from the state', () => {
    const mockSignupFn = jest.fn();
    const wrapper = mount(<ConnectedSignup signupUser={mockSignupFn} />);
    const emailInput = wrapper.find('#email');
    emailInput.instance().value = 'anasey@outlook.com';
    emailInput.simulate('change');

    const usernameInput = wrapper.find('#username');
    usernameInput.instance().value = 'anasey001';
    usernameInput.simulate('change');

    const passwordInput = wrapper.find('#password');
    passwordInput.instance().value = 'password123';
    passwordInput.simulate('change');

    const confirmPasswordInput = wrapper.find('#confirmPassword');
    confirmPasswordInput.instance().value = 'password123';
    confirmPasswordInput.simulate('change');

    const form = wrapper.find('form');
    form.simulate('submit');
    expect(mockSignupFn.mock.calls.length).toBe(1);
    wrapper.unmount();
  });
});
