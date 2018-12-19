import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Home2, { Home, mapDispatchToProps, mapStateToProps } from './Home';

const mockStore = configureMockStore();
const store = mockStore({});


describe('landing page', () => {
  const getProps = isLoading => (
    {
      featuredArticle: {
        isLoading,
        article: {}
      },
      relatedArticle: {
        isLoading,
        articles: [{ readTime: '1', title: 'title', description: 'description' }]
      },
      allArticles: [{ readTime: '1', title: 'title', description: 'description' }],
      featureArticle: () => {},
      relateArticle: () => {},
      allArticle: () => {}
    }
  );
  it('snap shot', () => {
    const props = getProps(true);
    const component = shallow(<Home {...props}/>);
    expect(component).toMatchSnapshot();
  });

  it('after loading', () => {
    const props = getProps(false);
    const component = shallow(<Home {...props}/>);
    expect(component.find('FeaturedArticle')).toBeDefined();
    expect(component.find('Pagination')).toBeDefined();
    expect(component.find('Banner')).toBeDefined();
    expect(component.find('Connect')).toBeDefined();
    expect(component.find('RelatedArticle')).toBeDefined();
    expect(component.find('.is-multiline')).toBeDefined();
  });

  it('after loading', () => {
    const props = getProps(true);
    const component = shallow(<Home {...props}/>);
    expect(component.find('Loading')).toBeDefined();
  });

  it('should show page is loading', () => {
    const props = getProps(false);
    const component = shallow(
      <Provider store={store}>
        <Home2 {...props}/>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });

  it('should show loading if props havent returned', () => {
    const props = getProps(true);
    const wrapper = shallow(
      <Provider store={store}>
        <Home {...props}/>
      </Provider>
    );

    expect(wrapper.find('Loading')).toBeDefined();
    expect(wrapper.find('Loader')).toBeDefined();
    expect(wrapper.find('Hearts')).toBeDefined();
  });

  it('should show page after loading ', () => {
    const props = getProps(false);
    const wrapper = shallow(
      <Provider store={store}>
        <Home {...props}/>
      </Provider>
    );
    expect(wrapper.find('footer-article')).toBeDefined();
  });

  it('define mapStateToProps', () => {
    const state = { addBookmarkReducer: { message: '' } };
    expect(mapStateToProps(state)).toBeDefined();
  });
  it('define mapDispatchToProps', () => {
    expect(mapDispatchToProps).toBeDefined();
    expect(mapDispatchToProps.featureArticle()).toBeDefined();
    expect(mapDispatchToProps.relateArticle()).toBeDefined();
    expect(mapDispatchToProps.allArticle()).toBeDefined();
  });
});
