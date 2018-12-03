import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ROUTE_PATH from '../utilities/routePath';
import Home from '../components/Home';
import Login from '../components/Login';
import NotFound from '../components/404';
import Signup from '../components/Signup';

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path={ROUTE_PATH.homepage} component={Home} exact />
          <Route path={ROUTE_PATH.user.login} component={Login} />
          <Route path={ROUTE_PATH.user.signup} component={Signup} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
