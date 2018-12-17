import { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { logoutRequest } from '../../../redux/actions/login/loginAction';

export const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutRequest())
});

export class ConnectedLogout extends Component {
  componentDidMount() {
    localStorage.removeItem('store');
    this.props.logout();
    this.props.history.push('/');
  }

  render() {
    return null;
  }
}

ConnectedLogout.propTypes = {
  logout: propTypes.func.isRequired,
  history: propTypes.object,
};

const Logout = connect(null, mapDispatchToProps)(ConnectedLogout);

export default Logout;
