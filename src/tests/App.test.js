import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import App from '../App';

describe('App component', () => {
  it('Should render the App component', () => {
    const wrapper = mount(<Provider store={store}>
      <App />
    </Provider>);
    expect(wrapper.find('div').exists()).toBe(true);
  });
});
