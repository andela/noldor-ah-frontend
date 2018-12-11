import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import store from '../../store';
import isLoggedIn from './isLoggedIn';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isLoggedIn(store)
      ? <Redirect to="/profile" />
      : <Component {...props} />
  )} />
);

export default PublicRoute;
