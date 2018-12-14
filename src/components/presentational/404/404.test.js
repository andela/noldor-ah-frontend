import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './404';

describe('404 shallow rendering test', () => {
  const wrapper = shallow(<NotFound />);

  it('should render without crashing', () => {
    expect(wrapper.find('h1').text()).toEqual('Page Not Found');
  });
});
