import React from 'react';
import { shallow } from 'enzyme';
import RelatedArticle from './RelatedArticles';


describe('test related article', () => {
  const setup = () => {
    const article = {
      article: {
        featureImg: '',
        title: 'this is the title',
        content: 'It is very clear to me'
      }
    };
    return shallow(<RelatedArticle {...article} />);
  };
  it('render Read More', () => {
    const wrapper = setup();
    expect(wrapper.find('.theme-color').text()).toEqual('Read More');
    expect(wrapper.find('.is-size-6').text()).toEqual('this is the title');
    expect(wrapper.find('.has-text-weight-light').text()).toEqual('It is very clear to me');
  });
});
