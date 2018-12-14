import React from 'react';
import { mount, shallow } from 'enzyme';
import { SinglePage, mapDispatchToProps, mapStateToProps } from './SingleArticle';
// import { loadAnArticle } from '../../../actions/singlearticle/singleArticleAction';

describe('landing page', () => {
  const getProps = isLoading => (
    {
      anArticle: {
        isLoading,
        article: []
      },
      relatedArticle: {
        isLoading,
        articles: []
      },
      allArticles: [],
      singleArticle: () => {},
      relateArticle: () => {},
      allArticle: () => {}
    }
  );
  it('should show page is loading', () => {
    const props = getProps(true);
    const component = shallow(<SinglePage {...props}/>);
    expect(component).toMatchSnapshot();
  });

  it('should show page is loading', () => {
    const props = getProps(false);
    const component = shallow(<SinglePage {...props}/>);
    expect(component).toMatchSnapshot();
  });

  it('should show loading if props havent returned', () => {
    const props = getProps(true);
    const wrapper = mount(<SinglePage {...props} />);
    expect(wrapper.find('Loading')).toBeDefined();
    expect(wrapper.find('Loader')).toBeDefined();
    expect(wrapper.find('Hearts')).toBeDefined();
    expect(wrapper.find('svg')).toHaveLength(1);
  });

  it('should show page after loading ', () => {
    const props = getProps(false);
    const wrapper = mount(<SinglePage {...props} />);
    expect(wrapper.find('footer-article')).toBeDefined();
  });

  it('define mapStateToProps', () => {
    const ownProp = {
      match: {
        params: {
          slug: ''
        }
      }
    };
    const state = {};
    expect(mapStateToProps(state, ownProp)).toBeDefined();
  });
  it('define mapDispatchToProps', () => {
    // const wrapper = shallow(<Connect  />)
    // console.log(wrapper.debug())
    // const props = {
    //   singleArticle: () => loadAnArticle(),

    // };

    expect(mapDispatchToProps).toBeDefined();
    // expect(mapDispatchToProps).toHaveReturned({ ...props });
  });
});
