import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('test header', () => {
  const props = {
    history: {
      listen: jest.fn()
    },
    handleBurger: jest.fn(),
  };
  const wrapper = shallow(<Header {...props} />);

  it('should render the header', () => {
    expect(wrapper.find('.nav').exists()).toBe(true);
  });
});
