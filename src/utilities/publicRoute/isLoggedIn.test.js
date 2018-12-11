import isLoggedIn from './isLoggedIn';

describe('isLoggedIn works as expected', () => {
  it('should return true when a token exists', () => {
    const store = {
      getState: () => ({
        login: {
          token: true
        }
      })
    };
    expect(isLoggedIn(store)).toBe(true);
  });

  it('should return false when a token does not exist', () => {
    const store = {
      getState: () => ({
        login: {
          token: false
        }
      })
    };
    expect(isLoggedIn(store)).toBe(false);
  });
});
