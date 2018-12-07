import React, { Component } from 'react';
import querystring from 'query-string';
import propsTypes from 'prop-types';
import routePath from '../../utilities/routePath';
import axiosRequest from '../../utilities/axiosRequest';

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
    axiosRequest.get(requestURL)
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
              {message}
            </h2>
            <p>You can now <span><a href="/login">Login</a> to your account</span></p>
          </center>
        </div>
      </section>
    );
  }
}

EmailVerified.propsTypes = {
  location: propsTypes.object,
  search: propsTypes.object,
};

export default EmailVerified;
