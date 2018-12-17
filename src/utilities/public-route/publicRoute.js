import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isLoggedIn from '../is-logged-in/isLoggedIn';

const PublicRoute = ({ component: Component, ...rest }) => {
  if (isLoggedIn()) {
    return (<Redirect to="profile" />);
  }
  return (<Route {...rest} component={Component} />);
};

export default PublicRoute;
