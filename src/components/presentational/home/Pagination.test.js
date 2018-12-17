import React from 'react';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Pagination from './Pagination';
import AllArticles from './AllArticles';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Pagination Test', () => {
  it('should return true if component exists', () => {
    const wrapper = mount(<Pagination />);
    expect(wrapper.find('li').exists()).toBe(true);
    expect(wrapper.find('.pagination-next').exists()).toBe(true);
    expect(wrapper.find('.pagination-previous').exists()).toBe(true);
  });
  it('should simulate a previous click event', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}>
      <Pagination />
    </Provider>);
    wrapper.find('.pagination-previous').simulate('click');
  });
  it('should return title props', () => {
    const props = {
      article: {
        title: ''
      }
    };
    const wrapper = mount(<AllArticles {...props} title="title" />);
    expect(wrapper.prop('title')).toBe('title');
  });
});
describe('It should render the right component', () => {
  it('Should renders expected components', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const props = {
        article: {
          content: 'This is just an enzyme test',
          category: 'life'
        }
      },
      articleContent = mount(shallow(<Provider store={store}>
        <AllArticles {...props} category="life" />
      </Provider>).get(0)),
      article = articleContent.find('.title is-5 is-pb1 is-uppercase');
    expect(article.prop.category).toBe(props.category);
  });
});
