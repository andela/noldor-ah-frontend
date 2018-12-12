import React from 'react';
import { shallow } from 'enzyme';
import { ConnectedRoutes } from './Routes';

describe('Routes.js shallow tests', () => {
  const mockedDispatch = jest.fn();
  const wrapper = shallow(<ConnectedRoutes dispatch={mockedDispatch} />);

  it('should render the app correctly', () => {
    expect(wrapper.find('Router').exists()).toBe(true);
  });
});
