import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Routes from './Routes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


describe('index.js shallow tests', () => {
  const store = mockStore({});
  const wrapper = mount(<Routes store={store}/>);

  it('should render the app correctly', () => {
    expect(wrapper.find('div').exists()).toBe(true);
  });
});
