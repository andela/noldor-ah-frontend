const isLoggedIn = (store) => {
  try {
    if (store.getState().login.token) return true;
  } catch (error) { /* do nothing */ }
  return false;
};

export default isLoggedIn;
