/* eslint-disable no-sequences */
import axios from 'axios';
import {
  CATEGORIES_LIST_REQUEST,
  CATEGORIES_LIST_SUCCESS,
  CATEGORIES_LIST_FAILURE
} from '../../types/categoriesList';

export const categoriesListSuccess = (categories) => {
  return { type: CATEGORIES_LIST_SUCCESS, categories };
};

export const categoriesListFailure = (error) => {
  return { type: CATEGORIES_LIST_FAILURE, error };
};

export const categoriesListRequest = () => {
  return { type: CATEGORIES_LIST_REQUEST };
};

export const loadCategoriesList = () => (dispatch) => {
  const request = axios({
    method: 'GET',
    url: 'https://noldor-ah-backend-staging.herokuapp.com/api/v1/categories',
    headers: []
  });
  dispatch(categoriesListRequest);
  return request.then(
    (response) => {
      dispatch(categoriesListSuccess(response.data.data));
    }
  ),
  err => dispatch(categoriesListFailure(err));
};
