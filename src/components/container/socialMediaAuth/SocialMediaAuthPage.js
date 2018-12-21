import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Loading from '../../common/loader/Loader';
import {
  handleSocialMediaAuth
} from '../../../redux/actions/social-media-auth/socialMediaAuthAction';

export class SocialMediaAuthPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {
      location, handleSocialMedia, provider, history
    } = this.props;
    const btnType = localStorage.getItem('button-type', provider);
    const apiToBecalled = `${location.pathname}/${btnType}/callback${location.search}`;
    handleSocialMedia(apiToBecalled)
      .then(() => history.push('profile'));
  }

  render() {
    const { loading } = this.props;
    if (loading === true) {
      return <Loading />;
    }
    return (
      null
    );
  }
}

SocialMediaAuthPage.propTypes = {
  history: propTypes.object,
  handleSocialMedia: propTypes.func,
  location: propTypes.object,
  provider: propTypes.string,
  loading: propTypes.bool
};

const mapStateToProps = state => ({
  loading: state.socialMediaUserReducer.loading,
  provider: state.socialMediaUserReducer.provider,
});

const mapDispatchToProps = (dispatch) => {
  return ({
    handleSocialMedia(url) {
      return dispatch(handleSocialMediaAuth(url));
    }
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialMediaAuthPage);
