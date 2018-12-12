import {
  SIGNUP_BEGIN,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from '../../types/signup';

const initialState = {
  loading: false,
  success: false,
  error: null,
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case SIGNUP_BEGIN:
    return {
      ...state,
      loading: true,
    };

  case SIGNUP_SUCCESS:
    return {
      ...state,
      loading: false,
      error: null,
      user: action.payload,
    };

  case SIGNUP_ERROR:
    return {
      ...state,
      loading: false,
      error: action.payload,
      user: null,
    };

  default:
    return state;
  }
};

export default reducer;
