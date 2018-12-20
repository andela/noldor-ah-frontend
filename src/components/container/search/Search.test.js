import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Search, { ConnectedSearch } from './Search';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const props = {
  searchFor: jest.fn(),
  toggleFilters: jest.fn(),
  loading: true,
  results: [],
  request: {},
  categoriesLoad: jest.fn(),
  updateKeyword: jest.fn(),
  getCategories: jest.fn(),
  getAuthors: jest.fn(),
  categories: ['categories'],
  authors: [{ id: 'id' }],
};
const initialState = {
  search: {
    loading: true,
    results: [],
    request: {},
  }
};

describe('ConnectedSearch mount rendering tests', () => {
  let wrapper;
  let store;
  let instance;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(<ConnectedSearch store={store} {...props} />);
    instance = wrapper.instance();
  });

  afterAll(() => wrapper.unmount());

  it('should render without crashing', () => {
    expect(wrapper.find('.search-page-container').exists()).toBe(true);
  });

  it('toggleFilters works as expected', () => {
    const window = {
      scrollTo: jest.fn(),
    };
    const sidebar = {
      current: {
        classList: {
          toggle: jest.fn()
        }
      }
    };
    instance.toggleFilters(sidebar, window);

    expect(sidebar.current.classList.toggle).toBeCalled();
  });

  it('renderCategories works as expected', async () => {
    await instance.renderCategories();
    expect(props.getCategories).toBeCalled();
  });

  it('renderAuthors works as expected', async () => {
    await instance.renderAuthors();
    expect(props.getAuthors).toBeCalled();
  });

  it('addCategory works as expected', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        classList: {
          add: jest.fn(),
        },
        innerText: 'All categories'
      }
    };

    instance.addCategory(event);
    event.target.innerText = 'something';
    instance.addCategory(event);

    expect(event.preventDefault).toBeCalledTimes(2);
    expect(event.target.classList.add).toBeCalledWith('active-category');
  });

  it('addAuthor works as expected', () => {
    instance.addAuthor();
    expect(instance.addAuthor).toBeDefined();
  });

  it('search works as expected', () => {
    let categoryFilter = true;
    const authorFilter = true;

    instance.search(categoryFilter, authorFilter);
    categoryFilter = false;
    instance.search(categoryFilter, authorFilter);

    expect(props.searchFor).toBeCalled();
  });

  it('searchInput works as expected', () => {
    const event = {
      key: 'Enter'
    };

    instance.searchInput(event);
    event.key = 'something';
    instance.searchInput(event);
    expect(props.updateKeyword).toBeCalled();
  });

  describe('renderResults() tests', () => {
    it('renderResults works when loading is true and results.length is false', () => {
      instance.renderResults();
      expect(wrapper.find('Loader').exists()).toBe(true);
    });

    it('renderResults works when loading is false and results.length is false', () => {
      props.loading = false;
      store = mockStore(initialState);
      wrapper = mount(<ConnectedSearch store={store} {...props} />);
      instance = wrapper.instance();
      instance.renderResults();
      expect(wrapper.find('.no-search-results').exists()).toBe(true);
    });

    it('renderResults works when loading is false and results.length is true', () => {
      props.results = [{
        id: 'id',
        slug: 'slug',
        featuredImg: 'image',
        title: 'title',
        description: 'desc',
        author: {
          username: 'smurf',
        },
        createdAt: 'today'
      }];
      store = mockStore(initialState);
      wrapper = mount(
        <MemoryRouter>
          <ConnectedSearch store={store} {...props} />
        </MemoryRouter>
      );
      instance = wrapper.instance();
      expect(wrapper.find('SearchCard').exists()).toBe(true);
    });
  });
});

describe('Search with connect', () => {
  let store;
  let wrapper;
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <MemoryRouter>
        <Search store={store} {...props} />
      </MemoryRouter>
    );
  });

  it('renders Search without crashing', () => {
    expect(wrapper.find('.search-page-container').exists()).toBe(true);
  });

  it('maps updateKeyword successfully', async () => {
    const instance = wrapper.find('ConnectedSearch').instance();
    const request = {
      keywords: 'smurfs',
    };

    instance.props.updateKeyword(request);
    expect(instance.props.updateKeyword).toBeDefined();
  });

  it('maps searchFor successfully', async () => {
    const instance = wrapper.find('ConnectedSearch').instance();
    const request = {
      keywords: 'smurfs',
    };

    instance.props.searchFor('google.com', request);
    expect(instance.props.searchFor).toBeDefined();
  });

  it('maps getAuthors successfully', async () => {
    const instance = wrapper.find('ConnectedSearch').instance();

    instance.props.getAuthors('google.com');
    expect(instance.props.getAuthors).toBeDefined();
  });
});
