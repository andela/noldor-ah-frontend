import categories, { initialState } from './categoriesList';
import {
  CATEGORIES_LIST_FAILURE,
  CATEGORIES_LIST_REQUEST,
  CATEGORIES_LIST_SUCCESS
} from '../../types/categoriesList';


describe('test categories article reducer', () => {
  it('it should return an object', () => {
    const action = {
      type: CATEGORIES_LIST_REQUEST
    };
    const action1 = {
      type: CATEGORIES_LIST_SUCCESS
    };
    const action2 = {
      type: CATEGORIES_LIST_FAILURE
    };
    const state = {
      categories: initialState.categories
    };
    expect(categories(initialState, action)).toEqual({ ...state, isLoading: true });
    expect(categories(initialState, action1)).toEqual({ isLoading: false });
    expect(categories(initialState, action2)).toEqual({ ...state, isLoading: false });
    expect(categories(initialState, '')).toEqual({ ...initialState });
  });
});
