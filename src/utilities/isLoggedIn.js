import store from '../store';

const isLoggedIn = () => {
  try {
    if (store.getState().login.loginDetails.token) return true;
  } catch (error) {
    return false;
  }
};

export default isLoggedIn;
