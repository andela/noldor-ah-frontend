const initialState = {
  loginDetails: {
    token: null,
    userId: null,
  },
};

try {
  const store = JSON.parse(localStorage.getItem('store'));
  initialState.loginDetails = store.login.loginDetails;
} catch (error) { /* do nothing */ }

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN':
    return {
      loginDetails: { ...action.payload }
    };

  default:
    return state;
  }
};

export default loginReducer;
