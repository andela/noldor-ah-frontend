import { shallow } from 'enzyme';
import React from 'react';
import { CategoriesList, mapDispatchToProps, mapStateToProps } from './CategoryList';

describe('categories list should display', () => {
  const getProps = () => (
    {
      categories: ['MUSIC'],
      categoryList: () => {}
    }
  );

  const mounted = () => {
    const categories = getProps();
    return shallow(<CategoriesList {...categories} />);
  };
  it('snap shot', () => {
    const wrapper = mounted();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the categories', () => {
    const wrapper = mounted();
    expect(wrapper.find('.categories-list').text()).toEqual('MUSIC');
    expect(wrapper.find('.categories-button').text()).toEqual('MORE');
  });

  it('define mapStateToProps', () => {
    const state = { categoriesListReducer: { categories: '' } };
    expect(mapStateToProps(state)).toBeDefined();
  });

  it('define mapDispatchToProps', () => {
    // expect(mapDispatchToProps).toBeDefined();

    mapDispatchToProps.categoryList();
    expect(mapDispatchToProps.categoryList()).toBeDefined();
  });
});
