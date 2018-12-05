import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('test header', () => {
  const header = shallow(<Header />);
  it('should render the header', () => {
    expect(header.find('.fa-search').text()).toEqual('search');
    expect(header.find('input').props().value).toBe(undefined);
  });
});
