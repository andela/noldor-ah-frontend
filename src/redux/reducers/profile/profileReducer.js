import {
  GET_USER_PROFILE_START,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE
} from '../../types/profileTypes';

const initialState = {
  user: {},
  loading: false,
  success: false,
  error: null
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_USER_PROFILE_START:
    return {
      ...state,
      loading: true,
    };
  case GET_USER_PROFILE_SUCCESS:
    return {
      ...state,
      loading: false,
      user: action.payload,
      success: true
    };
  case GET_USER_PROFILE_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload
    };
  default:
    return state;
  }
};

export default profileReducer;
