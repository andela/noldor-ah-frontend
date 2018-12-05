import React from 'react';
import { mount, shallow } from 'enzyme';
import { Home, mapDispatchToProps, mapStateToProps } from './Home';
import { loadFeatureArticle } from '../../../actions/featureArticleAction';
import { loadRelatedArticles } from '../../../actions/relatedArticlesAction';

describe('landing page', () => {
  const getProps = isLoading => (
    {
      featuredArticle: {
        isLoading,
        article: {}
      },
      relatedArticle: {
        isLoading,
        articles: []
      },
      allArticles: [],
      featureArticle: () => {},
      relateArticle: () => {},
      allArticle: () => {}
    }
  );
  it('should show page is loading', () => {
    const props = getProps(true);
    const component = shallow(<Home {...props}/>);
    expect(component).toMatchSnapshot();
  });

  it('should show page is loading', () => {
    const props = getProps(false);
    const component = shallow(<Home {...props}/>);
    expect(component).toMatchSnapshot();
  });

  it('should show loading if props havent returned', () => {
    const props = getProps(true);
    const wrapper = mount(<Home {...props} />);
    expect(wrapper.find('Loading')).toBeDefined();
    expect(wrapper.find('Loader')).toBeDefined();
    expect(wrapper.find('Hearts')).toBeDefined();
    expect(wrapper.find('svg')).toHaveLength(1);
  });

  it('should show page after loading ', () => {
    const props = getProps(false);
    const wrapper = mount(<Home {...props} />);
    expect(wrapper.find('footer-article')).toBeDefined();
  });

  it('define mapStateToProps', () => {
    const state = {};
    expect(mapStateToProps(state)).toBeDefined();
  });
  it('define mapDispatchToProps', () => {
    const props = {
      featureArticle: () => loadFeatureArticle(),
      relateArticle: () => loadRelatedArticles()

    };
    expect(mapDispatchToProps).toBeDefined();
    // expect(mapDispatchToProps).toHaveReturned({ ...props });
  });
});
