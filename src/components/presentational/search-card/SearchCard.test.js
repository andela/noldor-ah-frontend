import React from 'react';
import { shallow } from 'enzyme';
import SearchCard from './SearchCard';

describe('<SearchCard /> shallow rendering test', () => {
  const article = {
    key: 'key',
    id: 'id',
    slug: 'slug',
    featuredImg: 'img',
    title: 'title',
    description: 'description',
    author: { username: 'username' },
    date: 'date'
  };
  const wrapper = shallow(<SearchCard article={article} />);

  it('should render with props successfully', () => {
    expect(wrapper.find('div').at(0).hasClass('card')).toBe(true);
  });
});
