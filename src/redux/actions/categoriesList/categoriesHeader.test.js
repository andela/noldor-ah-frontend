import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';


import {
  CATEGORIES_LIST_FAILURE,
  CATEGORIES_LIST_SUCCESS,
  CATEGORIES_LIST_REQUEST
} from '../../types/categoriesList';

import {
  categoriesListFailure,
  categoriesListRequest,
  categoriesListSuccess,
} from './categoriesHeader';

const mock = new MockAdapter(axios);

describe('', () => {
  afterEach(() => {
    mock.reset();
  });
  it('successfully load categories', () => {
    const categories = {};
    const expected = {
      type: CATEGORIES_LIST_SUCCESS,
      categories
    };
    const action = categoriesListSuccess(categories);
    expect(action).toEqual(expected);
  });

  it('failed loading of categories', () => {
    const error = {};
    const errorLoading = {
      type: CATEGORIES_LIST_FAILURE,
      error
    };
    const action = categoriesListFailure(error);
    expect(action).toEqual(errorLoading);
  });

  it('load feature failure', () => {
    const loadingCategories = {
      type: CATEGORIES_LIST_REQUEST,
    };
    const action = categoriesListRequest();
    expect(action).toEqual(loadingCategories);
  });

  it('load feature article', () => {

  });
});
