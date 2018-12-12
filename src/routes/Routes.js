import React, { Component } from 'react';
import {
  Router, Route, Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import createHistory from 'history/createBrowserHistory';
import PublicRoute from '../utilities/publicRoute/publicRoute';
import ROUTE_PATH from '../utilities/routePath';
import Home from '../components/container/Home';
import Login from '../components/container/login/Login';
import NotFound from '../components/container/404';
import Signup from '../components/container/Signup/Signup';
import { notifyClear } from '../actions/notification/notificationAction';
import EmailVerified from '../components/container/EmailVerified/EmailVerified';

const history = createHistory();

const mapStateToProps = state => ({
  notification: state.notification,
});

class ConnectedRoutes extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;

    history.listen(() => {
      // clear notification on location change
      dispatch(notifyClear());
    });
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path={ROUTE_PATH.homepage} component={Home} exact />
          <PublicRoute path={ROUTE_PATH.user.login} component={Login} />
          <Route path={ROUTE_PATH.user.signup} component={Signup} />
          <Route path={ROUTE_PATH.user.verify} component={EmailVerified}/>
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

ConnectedRoutes.propTypes = {
  dispatch: propTypes.func.isRequired,
};

const Routes = connect(mapStateToProps)(ConnectedRoutes);

export default Routes;
