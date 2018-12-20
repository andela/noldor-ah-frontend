import React, { Component } from 'react';
import {
  Router, Route, Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import ProfileHead from '../../presentational/profile/Profile';
import BookmarkPage from '../bookmark/Bookmark';
import Published from '../published/PublishedArticle';
import Drafts from '../drafts/draftArticle';
import '../styles/Profile.scss';


export class Profile extends Component {
  render() {
    return (
      <div>
        <ProfileHead />
        <Switch>
          <Route path="/profile/bookmark" component={BookmarkPage} />
          <Route path="/profile/published" component={Published} />
          <Route path="/profile/drafts" component={Drafts} />
        </Switch>
      </div>
    );
  }
}


export default Profile;
