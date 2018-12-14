import React, { Component } from 'react';
import querystring from 'query-string';
import propTypes from 'prop-types';
import Axios from 'axios';
import routePath from '../../../utilities/route-path/routePath';

class EmailVerified extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  componentDidMount() {
    const values = querystring.parse(this.props.location.search);
    const userHash = values.id;
    this.verifyUser(userHash);
  }

  verifyUser = (userHash) => {
    const requestURL = `${routePath.user.apiVerifyEmail}?id=${userHash}`;
    Axios.get(requestURL)
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
      })
      .catch((error) => {
        this.setState({
          message: error.response.data.message,
        });
      });
  }

  render() {
    const { message } = this.state;
    return (
      <section className="section">
        <div className="container">
          <center>
            <h1 className="title is-center">Email Verification</h1>
            <h2 className="subtitle">
              { !message ? 'Verifying account...' : message }
            </h2>
            <p>You can now <span><a href="/login">Login</a> to your account</span></p>
          </center>
        </div>
      </section>
    );
  }
}

EmailVerified.propTypes = {
  location: propTypes.object,
  search: propTypes.object,
};

export default EmailVerified;
