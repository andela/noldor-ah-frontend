import {
  CATEGORIES_LIST_FAILURE,
  CATEGORIES_LIST_REQUEST,
  CATEGORIES_LIST_SUCCESS
} from '../../types/categoriesList';

export const initialState = {
  categories: ['music', 'life', 'family'],
  isLoading: false
};

const categoriesListReducer = (state = initialState, action) => {
  switch (action.type) {
  case CATEGORIES_LIST_REQUEST:
    return {
      ...state,
      isLoading: true
    };
  case CATEGORIES_LIST_SUCCESS:
    return {
      ...state,
      categories: action.categories,
      isLoading: false
    };
  case CATEGORIES_LIST_FAILURE:
    return {
      ...state,
      isLoading: false,
      error: action.error
    };
  default:
    return state;
  }
};
export default categoriesListReducer;
