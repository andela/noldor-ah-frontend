import {
  SOCIAL_AUTH_BEGIN, SOCIAL_AUTH_SUCCESS, SOCIAL_AUTH_FAILURE, SOCIALMEDIA_PROVIDER
} from '../../types/socialMediaAuthType';

const initialState = {
  provider: null,
  user: {},
  loading: false,
  success: false,
  error: null,
  token: null,
};


try {
  const store = JSON.parse(localStorage.getItem('store'));
  initialState.provider = store.socialMediaAuth.provider;
} catch (error) { /* do nothing */ }

const socialMediaUserReducer = (state = initialState, action) => {
  switch (action.type) {
  case SOCIAL_AUTH_BEGIN:
    return {
      ...state,
      loading: true,
    };
  case SOCIAL_AUTH_SUCCESS:
    return {
      ...state,
      user: action.payload.user,
      loading: false,
      success: true,
      token: action.payload.token,
    };
  case SOCIAL_AUTH_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload
    };
  case SOCIALMEDIA_PROVIDER:
    return {
      ...state,
      provider: action.payload
    };
  default:
    return state;
  }
};

export default socialMediaUserReducer;
