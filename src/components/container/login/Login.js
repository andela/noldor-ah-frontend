import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { loginRequest } from '../../../redux/actions/login/loginAction';
import { Input, Notification, Button } from '../../presentational/index';
import { LOGIN_SUCCESS } from '../../../redux/types/login';
import '../styles/Login.scss';

const mapStateToProps = state => ({
  notification: state.notification,
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(loginRequest(user))
});

export class ConnectedLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      status: '',
      message: '',
      display: 'none',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();

    const {
      history, login,
    } = this.props;

    try {
      const response = await login({ ...this.state });
      this.setState({
        display: 'block',
        message: this.props.notification.message,
        status: this.props.notification.type,
      });
      if (response === LOGIN_SUCCESS) {
        return setTimeout(() => history.push('/', { prev: 'login' }), 500);
      }
    } catch (error) {
      /* do nothing */
    }
  }

  render() {
    const {
      email, password,
      status, message, display
    } = this.state;

    return (
      <div className="container is-desktop level login-container">
        <div className="container column is-half login-left" />
        <div className="container column level level-item login-right">
          <div className="login-intro-container">
            <h2 className="level-item login-intro">WELCOME BACK</h2>
            <p className="level-item login-intro">Login to your account below</p>
          </div>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <Notification
              status={status}
              message={message}
              display={display}
            />
            <Input
              id="email"
              title="E-mail"
              name="email"
              type="email"
              value={email}
              onChange={this.handleInputChange}
              placeholder="Enter your email address here"
              required
            />

            <Input
              id="password"
              title="Password"
              name="password"
              type="password"
              value={password}
              onChange={this.handleInputChange}
              placeholder="Enter your password here"
              required
            />

            <Button
              type="submit"
              text="LOGIN"
            />
          </form>
          <p
            className="cta"
          >
          No account yet? <Link to="signup">Sign up here</Link></p>
          <p
            className="cta"
          >
          Forgot password? <Link to="forgot-password">click here</Link></p>
        </div>
      </div>
    );
  }
}

ConnectedLogin.propTypes = {
  history: propTypes.object,
  dispatch: propTypes.func,
  notification: propTypes.object,
};

const Login = connect(mapStateToProps, mapDispatchToProps)(ConnectedLogin);

export default Login;
