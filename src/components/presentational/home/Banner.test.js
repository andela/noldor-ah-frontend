import React from 'react';
import { shallow } from 'enzyme';
import Banner from './Banner';


describe('display banner', () => {
  const setup = () => {
    return shallow(<Banner />);
  };
  it('render Banner component', () => {
    const wrapper = setup();
    expect(wrapper.find('.is-size-3-mobile').text()).toEqual('JOIN THE COMMUNITY');
    expect(wrapper.find('p').first().text())
      .toEqual('Authors Haven is a community of like minded authors '
      + 'and readers that foster inspiration and innovation');
    expect(wrapper.find('a').first().text()).toEqual('GET STARTED');
  });
});
