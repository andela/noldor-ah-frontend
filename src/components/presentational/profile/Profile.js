import React from 'react';
import { Link } from 'react-router-dom';
const profile = () => (
  <section className="profile-header">
    <div className="container profile-content is-pt3 is-pb2">
      <div className="columns">
        <div className="column is-2">
          <figure className="image is-pl1 is-pr1 ">
            <img className="is-rounded is-pinkborder" src="https://bulma.io/images/placeholders/128x128.png"/>
          </figure>
        </div>
        <div className="column is-8">
          <p className="title profile-author-name">Coming Soon.....</p>
          <p className="is-size-6" >.......................................................................</p>
        </div>
        <div className="column is-2">
          <button className="button">Edit Profile</button>
        </div>
      </div>
    </div>
    <div className="container profile-footer has-text-centered">
      <ul className="is-size-5 ul-profile">
        <li><Link to="/profile/bookmark">Bookmark </Link></li>
        <li><Link to="/profile/published">Published </Link></li>
        <li><Link to="/profile/drafts">Drafts </Link></li>
        <li>Followers</li>
        <li>Followings</li>
      </ul>
    </div>
  </section>
);

export default profile;
