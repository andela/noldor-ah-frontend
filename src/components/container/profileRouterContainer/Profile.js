import React, { Component } from 'react';
import {
  Router, Route, Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import ProfileHead from '../profileContainer/Profile';
import Loading from '../../common/loader/Loader';
import BookmarkPage from '../bookmark/Bookmark';
import Published from '../published/PublishedArticle';
import Drafts from '../drafts/draftArticle';
import { handleGetProfile } from '../../../redux/actions/profile/profileAction';
import '../styles/Profile.scss';


export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    const {
      userId, getUsersprofile
    } = this.props;
    await getUsersprofile(userId);
  }

  render() {
    const { loading, user } = this.props;
    if (loading === true) {
      return <Loading />;
    }
    return (
      <div>
        <ProfileHead
          name={user.username}
          bio={user.bio}
          image={user.avatarUrl}
        />
        <Switch>
          <Route path="/profile/bookmark" component={BookmarkPage} />
          <Route path="/profile/published" component={Published} />
          <Route path="/profile/drafts" component={Drafts} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.profileReducer.user,
  userId: state.login.id,
  loading: state.profileReducer.loading
});

const mapDispatchToProps = dispatch => ({
  getUsersprofile: userId => dispatch(handleGetProfile(userId)),
});

Profile.propTypes = {
  loading: propTypes.bool,
  userId: propTypes.string,
  user: propTypes.object,
  getUsersprofile: propTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
