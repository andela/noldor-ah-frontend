import React from 'react';
import { shallow } from 'enzyme';
import SingleArticle from './singleArticle';


describe('display single article page', () => {
  const setup = () => {
    const article = {
      article: {
        featuredImg: 'xyz.jpg',
        title: 'this is the title',
        description: 'this is the description',
        content: 'It is very clear to me',
        updatedAt: '2018-12-07T10:01:09.143Z',
        likes: 5,
        User: {
          username: 'noldor',
          avatarUrl: 'noldor.jpg'
        }
      },
      read: () => {}
    };
    return shallow(<SingleArticle {...article} />);
  };
  it('render single article content component', () => {
    const wrapper = setup();

    expect(wrapper.find('.single-article-title').text()).toEqual('this is the title');
    expect(wrapper.find('.single-description').text()).toEqual('this is the description');
    expect(wrapper.find('.is-featured-img').prop('src')).toEqual('xyz.jpg');
    expect(wrapper.find('.article-content').text()).toEqual('It is very clear to me');
    expect(wrapper.find('.article-like').text()).toEqual('5');
  });
});
