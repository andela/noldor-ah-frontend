import store from '../store';

const isLoggedIn = () => {
  if (store.getState().login.token) return true;
  return false;
};

export default isLoggedIn;
