import {
  SEARCH_BEGIN, SEARCH_SUCCESS,
  SEARCH_FAILURE, CATEGORIES_LOADED,
  SET_KEYWORD,
  AUTHORS_LOADED,
} from '../../types/search';

const initialState = {
  request: null,
  categories: [],
  authors: [],
  results: [],
  loading: true,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_KEYWORD:
    return {
      ...state,
      request: action.payload,
    };

  case CATEGORIES_LOADED:
    return {
      ...state,
      loading: false,
      categories: action.payload,
    };

  case AUTHORS_LOADED:
    return {
      ...state,
      loading: false,
      authors: action.payload,
    };

  case SEARCH_BEGIN:
    return {
      ...state,
      request: action.payload,
      loading: true,
    };

  case SEARCH_SUCCESS:
    return {
      ...state,
      loading: false,
      results: action.payload,
    };

  case SEARCH_FAILURE:
    return {
      ...state,
      loading: false,
      results: [],
    };

  default:
    return state;
  }
};

export default searchReducer;
