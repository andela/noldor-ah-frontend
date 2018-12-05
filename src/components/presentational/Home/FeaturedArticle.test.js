import React from 'react';
import { shallow } from 'enzyme';
import FeaturedArticle from './FeaturedArticle';


describe('display banner', () => {
  const setup = () => {
    const article = {
      article: {
        featureImg: '',
        title: 'this is the title',
        description: 'this is the description',
        content: 'It is very clear to me',
        updatedAt: '2018-12-07T10:01:09.143Z',


      }
    };
    return shallow(<FeaturedArticle {...article} />);
  };
  it('render Banner component', () => {
    const wrapper = setup();

    expect(wrapper.find('p').first().text()).toEqual('this is the title');
    expect(wrapper.find('button').first().text()).toEqual('Read this article');
    expect(wrapper.find('.tag').text()).toEqual('featured');
    // expect(wrapper.find('.has-text-weight-bold').text()).toEqual('Dec 10th   1 min read');
    expect(wrapper.find('p').last().text()).toEqual('this is the description');
  });
});
