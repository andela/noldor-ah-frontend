import {
  SIGNUP_USER,
} from '../types/signup';

const initialState = {
  signupResponse: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case SIGNUP_USER:
    return {
      ...state,
      signupResponse: { ...action.payload }
    };

  default:
    return state;
  }
};

export default reducer;
