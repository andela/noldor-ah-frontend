import { LOGIN_BEGIN, LOGIN_SUCCESS, LOGIN_ERROR } from '../../types/login';

let initialState = {
  loading: false,
  success: false,
  error: null,
  token: null,
  id: null,
};

try {
  const store = JSON.parse(localStorage.getItem('store'));
  initialState = store.login;
} catch (error) { /* do nothing */ }

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN_BEGIN:
    return {
      ...state,
      loading: true,
    };

  case LOGIN_SUCCESS:
    return {
      ...state,
      loading: false,
      success: true,
      token: action.payload.token,
      id: action.payload.id,
    };

  case LOGIN_ERROR:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };

  default:
    return state;
  }
};

export default loginReducer;
