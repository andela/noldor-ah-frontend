import {
  ADD_BOOKMARK_FAILURE,
  ADD_BOOKMARK_REQUEST,
  ADD_BOOKMARK_SUCCESS
} from '../../types/bookmark';

export const initialState = {
  message: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case ADD_BOOKMARK_REQUEST:
    return {
      ...state,
    };

  case ADD_BOOKMARK_SUCCESS:
    return {
      ...state,
      message: action.message,
    };

  case ADD_BOOKMARK_FAILURE:
    return {
      ...state,
      error: action.error,
    };

  default:
    return state;
  }
};

export default reducer;
