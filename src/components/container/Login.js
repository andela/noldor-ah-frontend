import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import saveToken from '../../actions/tokenAction';
import {
  Input, Notification, Button,
} from '../presentational/index';
import './styles/Login.scss';

const mapDispatchToProps = dispatch => ({
  storeToken: token => dispatch(saveToken(token))
});

class ConnectedLogin extends Component {
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

  handleSubmit = (e) => {
    e.preventDefault();

    const { history, storeToken } = this.props;
    const {
      email, password,
    } = this.state;
    const user = { email, password };

    return Axios.post('https://noldor-ah-backend-staging.herokuapp.com/api/v1/users/login', user)
      .then((response) => {
        const { token, message: resMessage } = response.data;
        storeToken(token);
        this.setState({ message: resMessage, display: 'block', status: 'success' });
        setTimeout(() => history.push('profile', { prev: 'login' }), 500);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          return this.setState({
            message: err.response.data.error.email,
            status: 'error',
            display: 'block',
          });
        }
        return this.setState({
          message: err.response.data.message,
          status: 'error',
          display: 'block',
        });
      });
  }

  render() {
    const {
      email, password,
      status, message, display
    } = this.state;

    return (
      <div className="container columns is-desktop level login-container">
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
              title="E-mail"
              name="email"
              type="email"
              value={email}
              onChange={this.handleInputChange}
              placeholder="Enter your email address here"
              required
            />

            <Input
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
  history: propTypes.object.isRequired,
  storeToken: propTypes.func.isRequired,
};

const Login = connect(null, mapDispatchToProps)(ConnectedLogin);

export default Login;
