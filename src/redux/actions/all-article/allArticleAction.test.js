import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Pagination from '../../../components/presentational/home/Pagination/Pagination';
import { loadAllArticles } from './allArticleAction';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


describe('Actions test', () => {
  it('should simulate a next click event', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}>
      <Pagination />
    </Provider>);
    wrapper.find('.pagination-next').simulate('click');
  });
  it('Should dispatch the right success action', async () => {
    const initialState = {};
    const store = mockStore(initialState);
    const response = await store.dispatch(loadAllArticles(1));
    expect(response.type).toBe('LOAD_ARTICLE_SUCCESS');
    expect(response.articles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          published: true
        })
      ])
    );
  });
  it('Should dispatch the right error action', async () => {
    const initialState = {};
    const store = mockStore(initialState);
    const response = await store.dispatch(loadAllArticles(5999999));
    expect(response.type).toBe('LOAD_ARTICLE_FAILURE');
  });
});
