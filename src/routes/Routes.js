import React, { Component } from 'react';
import {
  Router, Route, Switch, Redirect,
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ROUTE_PATH from '../utilities/routePath';
import Home from '../components/container/Home';
import Login from '../components/container/Login';
import NotFound from '../components/container/404';
import Signup from '../components/container/Signup';
import isLoggedIn from '../utilities/isLoggedIn';

const history = createHistory();

class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path={ROUTE_PATH.homepage} component={Home} exact />
          <Route path={ROUTE_PATH.user.login} render={() => {
            if (isLoggedIn()) {
              return <Redirect to="/profile" />;
            }
            return <Login history={history}/>;
          }}
          />
          <Route path={ROUTE_PATH.user.signup} component={Signup} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
