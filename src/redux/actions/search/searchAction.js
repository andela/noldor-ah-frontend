import Axios from 'axios';
import {
  SEARCH_BEGIN, SEARCH_SUCCESS,
  SEARCH_FAILURE, CATEGORIES_LOADED,
  AUTHORS_LOADED, SET_KEYWORD,
} from '../../types/search';

export const searchBegin = request => ({
  type: SEARCH_BEGIN,
  payload: request,
});
export const searchSuccess = results => ({
  type: SEARCH_SUCCESS,
  payload: results,
});
export const searchFailure = () => ({ type: SEARCH_FAILURE });
export const categoriesLoaded = categories => ({
  type: CATEGORIES_LOADED,
  payload: categories
});
export const authorsLoaded = authors => ({
  type: AUTHORS_LOADED,
  payload: authors
});
export const setKeyword = keyword => ({
  type: SET_KEYWORD,
  payload: keyword,
});

export const getCategories = (url) => {
  return async (dispatch) => {
    const categories = await Axios.get(url);
    if (categories.data.data) {
      dispatch(categoriesLoaded(categories.data.data));
    }
  };
};

export const getAuthors = (url) => {
  return async (dispatch) => {
    const authors = await Axios.get(url);

    if (authors.data.message[1]) {
      dispatch(authorsLoaded(authors.data.message[1]));
    }
  };
};

export const searchRequest = (url, request) => {
  return async (dispatch) => {
    dispatch(searchBegin(request));

    const searchResults = await Axios.post(url, request)
      .catch(() => dispatch(searchFailure()));

    if (searchResults.type !== SEARCH_FAILURE) {
      dispatch(searchSuccess(searchResults.data.articles));
    }
  };
};
