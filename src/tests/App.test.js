import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

describe('App component', () => {
  it('Should render the App component', () => {
    const wrapper = mount(
      <App />
    );
    expect(wrapper.find('div').exists()).toBe(true);
  });
});
