import React from 'react';
import { mount } from 'enzyme';
import Paginator from './Paginator';

describe('Paginator Test', () => {
  it('should exist', () => {
    const wrapper = mount(<Paginator />);
    expect(wrapper.find('createPaginationArray').exists()).toBe(true);
  });
  it('should return an array of pages', () => {
    const pageArray = Paginator(1);
    expect(typeof pageArray).toBe('object');
  });
  it('should return an array of length 5', () => {
    const pageArray = Paginator(8);
    expect(pageArray.length).toEqual(5);
  });
  it('Always return a length of 5', () => {
    const pageArray = Paginator(1);
    expect(pageArray.length).toEqual(5);
  });
});
