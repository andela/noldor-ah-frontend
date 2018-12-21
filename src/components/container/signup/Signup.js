import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Notification, ModalNotification, SocialButton } from '../../presentational/index';
import { setProvider } from '../../../redux/actions/social-media-auth/socialMediaAuthAction';
import { signupRequest } from '../../../redux/actions/signup/signupAction';
import '../styles/Signup.scss';

export class ConnectedSignup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      status: '',
      successStatus: '',
      message: '',
      successMessage: '',
      display: 'none',
    };
    this.handleSocialButton = this.handleSocialButton.bind(this);
  }

  handleSocialButton(e) {
    switch (e.target.className) {
    case 'social-gl-btn loginBtn':
      setProvider('google');
      localStorage.setItem('button-type', 'google');
      break;
    default:
      setProvider('facebook');
      localStorage.setItem('button-type', 'facebook');
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { ...this.state };
    const { signupUser } = this.props;

    await signupUser(userData);
    const { notification } = this.props;

    if (notification.type === 'error') {
      this.setState({
        display: 'block',
        message: notification.message,
        status: notification.type,
      });
    } else {
      this.setState({
        status: 'success',
        successMessage: notification.message,
        display: 'none',
      });
    }
  }

  handleChange= (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render() {
    const {
      status,
      message,
      successMessage,
      display
    } = this.state;

    return (
      <div className="grey-background is-pt5">
        <div className="container is-desktop signup-container">
          <div className="signup-left" />
          <div className="signup-right">
            <h2 className="signup-intro bold">WELCOME</h2>
            <p className="signup-intro desktop-view light">
            Signup Below to Start Interacting With Awesome Content.
            </p>
            <p className="signup-intro-mobile light">Please signup below</p>

            <form className="signup-form" onSubmit={this.handleSubmit}>
              <ModalNotification status={status} successMessage={successMessage} />
              <Notification status={status} message={message} display={display} />
              <div className="form-group">
                <label htmlFor="email" className="form-label">E-mail</label>
                <input type="email" id="email" name="email"
                  placeholder="Enter your email address here"
                  onChange={this.handleChange} required />
              </div>

              <div className="form-group" >
                <label htmlFor="username"
                  className="form-label"> Username</label>
                <input type="text" id="username" name="username"
                  placeholder="Enter your preferred username here"
                  onChange={this.handleChange} required />
              </div>

              <div className="form-group" >
                <label htmlFor="password"
                  className="form-label">
                  Password</label>
                <input type="password" id="password"
                  name="password" placeholder="Enter a secure password here"
                  onChange={this.handleChange} required />
              </div>

              <div className="form-group" >
                <label htmlFor="confirmPassword"
                  className="form-label">Confirm password</label>
                <input type="password" id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Ensure your password matches the one above"
                  onChange={this.handleChange} required />
              </div>
              <button type="submit">Signup</button>
              <p className="signup-cta tiny-font">Already have an account
                <a className="tiny-font" href="/login">Log in here</a></p>
              <p
                className="cta"
              >Forgot password? <Link to="forgot-password">click here</Link></p>
            </form>
            <p className="or"><span>OR</span></p>
            <div className="columns">
              <div className="column">
                <div className=" column is-three-quarters-mobile
                is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
                  <SocialButton
                    className="social-fc-btn loginBtn"
                    fonticon="fa-facebook-f"
                    text="Signup With Facebook"
                    onClick={this.handleSocialButton}
                    href={'https://noldor-ah-backend-staging.herokuapp.com/api/v1/auth/facebook'}
                  />
                </div>
              </div>
              <div className="column">
                <div className="column is-three-quarters-mobile
                is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
                  <SocialButton
                    className="social-gl-btn loginBtn"
                    fonticon="fa-google-plus-g"
                    onClick={this.handleSocialButton}
                    text="Signup with Google"
                    href={'https://noldor-ah-backend-staging.herokuapp.com/api/v1/auth/google'}
                    // href={'http://localhost:3000/api/v1/auth/google'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ConnectedSignup.propTypes = {
  signupUser: propTypes.func,
};

const mapDispatchToProps = dispatch => ({
  signupUser: user => dispatch(signupRequest(user))
});

const mapStateToProps = state => ({
  notification: state.notification
});

const Signup = connect(mapStateToProps, mapDispatchToProps)(ConnectedSignup);

export default Signup;
