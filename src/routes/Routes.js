import React, { Component } from 'react';
import {
  Router, Route, Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import createHistory from 'history/createBrowserHistory';
import PublicRoute from '../utilities/publicRoute/publicRoute';
import ROUTE_PATH from '../utilities/routePath';
import Login from '../components/container/login/Login';
import NotFound from '../components/container/404';
import Signup from '../components/container/Signup/Signup';
import { notifyClear } from '../actions/notification/notificationAction';
import EmailVerified from '../components/container/EmailVerified/EmailVerified';
import Homepage from '../components/container/home/Home';
// eslint-disable-next-line import/no-named-as-default
import SinglePage from '../components/container/article/SingleArticle';
import Logout from '../components/container/logout/Logout';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Profile from '../components/presentational/profile/Profile';

const history = createHistory();

const mapStateToProps = state => ({
  notification: state.notification,
});

export class ConnectedRoutes extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;

    history.listen(() => {
      dispatch(notifyClear());
    });
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Header history={history} />
          <Switch>
            <Route path={ROUTE_PATH.homepage} component={Homepage} exact />
            <PublicRoute path={ROUTE_PATH.user.login} component={Login} />
            <Route path={ROUTE_PATH.user.logout} component={Logout} />
            <Route path="/profile" component={Profile} />
            <Route path={ROUTE_PATH.user.signup} component={Signup} />
            <Route path={ROUTE_PATH.user.verify} component={EmailVerified}/>
            <Route path={ROUTE_PATH.article.single} component={SinglePage} />

            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

ConnectedRoutes.propTypes = {
  dispatch: propTypes.func.isRequired,
};

const Routes = connect(mapStateToProps)(ConnectedRoutes);

export default Routes;
