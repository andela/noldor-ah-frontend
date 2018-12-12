import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
// import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Signup, { ConnectedSignup } from './Signup';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);


describe('<Signup />', () => {
  let wrapper;
  const mockSignupFn = jest.fn();

  beforeEach(() => {
    const props = {
      notification: {
        type: 'error',
      }
    };
    const store = mockStore({});
    const mounted = mount(
      <MemoryRouter>
        <Signup store={store} {...props} handleSubmit={mockSignupFn} />
      </MemoryRouter>
    );

    wrapper = mounted.find('ConnectedSignup');
  });

  it('matches the snapshoot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('render sigup page correctly', () => {
    wrapper = mount(<MemoryRouter>
      <ConnectedSignup />
    </MemoryRouter>);
    expect(wrapper.find('.signup-left').exists()).toBe(true);
    expect(wrapper.find('.signup-right').exists()).toBe(true);
    expect(wrapper.find('h2').text()).toBe('WELCOME');
    expect(wrapper.find('h2').length).toEqual(1);
    expect(wrapper.find('form input').length).toEqual(4);
  });

  it('should update states when data is passed', () => {
    // const wrapper = mount(<ConnectedSignup />);
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
  });

  it('should submit inputs from the state', () => {
    // const wrapper = mount(<ConnectedSignup signupUser={mockSignupFn} />);
    // console.log(wrapper.props())
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
    expect(wrapper.instance().state).toMatchObject(
      {
        email: 'anasey@outlook.com',
        username: 'anasey001',
        password: 'password123',
        confirmPassword: 'password123',
        status: '',
        successStatus: '',
        message: '',
        successMessage: '',
        display: 'none'
      }
    );
    // expect(mockSignupFn.mock.calls.length).toBe(1);
    // wrapper.unmount();
  });

  it('handleSocialButton works as expected', () => {
    const e = {
      target: {
        className: 'social-gl-btn'
      }
    };
    wrapper.instance().handleSocialButton(e);
    delete e.target.className;
    wrapper.instance().handleSocialButton(e);

    expect(wrapper.instance().handleSocialButton).toBeDefined();
  });
});
