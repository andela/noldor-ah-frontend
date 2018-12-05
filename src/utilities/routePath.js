const ROUTE_PATH = {
  homepage: '/home',
  user: {
    signup: '/signup',
    login: '/login',
    all: '/users',
    forgotPassword: '/users/forgot',
    resetPassword: '/users/forgot/:hash',
    profile: '/users/:userId/profiles',
    editProfile: '/users/:userId/profiles',
    deactivate: '/users/:userId/deactivate',
    verify: '/users/verify/',
    apiVerifyEmail: 'https://noldor-ah-backend-staging.herokuapp.com/api/v1/users/verify'
  },
  article: {
    all: '/articles',
    post: '/articles',
    update: '/articles/:slug',
    delete: '/articles/:slug',
  }
};

export default ROUTE_PATH;
