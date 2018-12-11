import React from 'react';
import { shallow } from 'enzyme';
import { ConnectedLogin } from './Login';

describe('<Login /> shallow rendering tests', () => {
  const mockLoginFn = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ConnectedLogin login={mockLoginFn} />);
  });

  it('should render Login successfully', () => {
    expect(wrapper.find('.login-form').exists()).toBe(true);
    expect(wrapper.find('.login-intro').length).toBe(2);
    expect(wrapper.find('.login-intro-container')
      .childAt(1).text()).toBe('Login to your account below');
  });

  it('matches the snapshot', () => {
    const tree = shallow(<ConnectedLogin />);
    expect(tree).toMatchSnapshot();
  });

  it('should render all the children components successfully', () => {
    expect(wrapper.find('Notification').exists()).toBe(true);
    expect(wrapper.find('Input').exists()).toBe(true);
    expect(wrapper.find('Button').exists()).toBe(true);
  });

  it('should handle input changes successfully', () => {
    wrapper.find('#email').simulate(
      'change',
      {
        target: {
          name: 'email',
          value: 'papa@smurfs.com'
        }
      }
    );

    wrapper.find('#password').simulate(
      'change',
      {
        target: {
          name: 'password',
          value: 'GargamelIsComing!'
        }
      }
    );

    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(mockLoginFn.mock.calls[0][0]).toEqual({
      email: 'papa@smurfs.com',
      password: 'GargamelIsComing!',
      display: 'none', // because state also handles other stuff
      message: '',
      status: ''
    });
  });

  it('should submit successfully', () => {
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(mockLoginFn.mock.calls.length).toBe(1);
  });
});
