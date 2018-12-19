import store from '../../redux/store';

const isLoggedIn = () => {
  try {
    if (store.getState().login.token) return true;
  } catch (error) { /* do nothing */ }
  return false;
};

export const isUser = (id) => {
  try {
    if (store.getState().login.id === id) return true;
  } catch (error) { /* do nothing */ }
  return false;
};

export default isLoggedIn;
