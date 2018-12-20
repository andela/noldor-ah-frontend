import {
  CREATE_DRAFT_SUCCESS,
  CREATE_DRAFT_ERROR,
  CREATE_ARTICLE_ERROR,
} from '../../types/createArticle';

const initialState = {
  error: null,
  slug: null,
  article: null,
};

const createArticleReducer = (state = initialState, action) => {
  switch (action.type) {
  case CREATE_DRAFT_SUCCESS:
    return {
      ...state,
      article: action.payload,
      slug: action.payload.slug,
    };
  case CREATE_ARTICLE_ERROR:
    return {
      ...state,
      error: action.payload,
    };

  case CREATE_DRAFT_ERROR:
    return {
      ...state,
      error: action.payload,
    };

  default:
    return state;
  }
};

export default createArticleReducer;
