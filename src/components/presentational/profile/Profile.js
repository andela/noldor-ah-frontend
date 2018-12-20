import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import store from '../../../redux/store/index';

const Profile = () => (
  <section className="profile-header">
    <div className="container profile-content is-pt3 is-pb2">
      <div className="columns">
        <div className="column is-2">
          <figure className="image is-pl1 is-pr1 ">
            <img className="is-rounded is-pinkborder" src="https://bulma.io/images/placeholders/128x128.png"/>
          </figure>
        </div>
        <div className="column is-8">
          <p className="title profile-author-name">Hope Uwa</p>
          <p className="is-size-6" >He is fun ging and all of thing that he can not untill he has done it with</p>
        </div>
        <div className="column is-2">
          <button className="button">Edit Profile</button>
        </div>
      </div>
    </div>
    <div className="container profile-footer has-text-centered">
      <ul className="is-size-5 ul-profile">
        <li><Link to="/profile/bookmark">Bookmark <sup>3</sup></Link></li>
        <li><Link to="/profile/published">Published <sup>3</sup></Link></li>
        <li><Link to="/profile/drafts">Drafts <sup>3</sup></Link></li>
        <li>Followers<sup>3</sup></li>
        <li>Followings<sup>3</sup></li>
      </ul>
    </div>
  </section>
);

export default Profile;
