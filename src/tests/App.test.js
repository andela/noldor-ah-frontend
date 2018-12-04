import React from 'react';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from '../App';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('App component', () => {
  it('should dispatch action', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const wrapper = mount(<Provider store={store}>
      <App/>
    </Provider>);

    wrapper.find('button').simulate('click');
    // expect(wrapper.find('h1')).toBe('Welcome to Authors Haven');
  });
});
