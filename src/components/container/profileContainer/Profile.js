import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.modal = React.createRef();
  }

  toggleModal = () => {
    this.modal.current.classList.toggle('is-active');
  };

  render() {
    const {
      name, bio, image
    } = this.props;

    return (
      <section className="profile-header">
        <div className="modal" ref={this.modal}>
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Edit Your Profile</p>
              <button className="delete" aria-label="close" onClick={this.toggleModal}/>
            </header>
            <section className="modal-card-body">
              <form>
                <div className="field">
                  <label className="label">First Name</label>
                  <div className="control">
                    <input className="input" type="text" placeholder="Text input"/>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Last Name</label>
                  <div className="control">
                    <input className="input" type="text" placeholder="Text input"/>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control has-icons-left has-icons-right">
                    <input className="input" type="text"
                      placeholder="Text input" value="bulma"/>
                    <span className="icon is-small is-left">
                      <i className="fas fa-user" />
                    </span>
                    <span className="icon is-small is-right">
                      {/* <i className="fas fa-check" /> */}
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Email</label>
                  <div className="control has-icons-left has-icons-right">
                    <input className="input is-danger" type="email"
                      placeholder="Email input" value="hello@"/>
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope" />
                    </span>
                    <span className="icon is-small is-right">
                      {/* <i className="fas fa-exclamation-triangle" /> */}
                    </span>
                    <div className="file">
                      <label className="file-label">
                        <input className="file-input" type="file" name="resume"/>
                        <span className="file-cta">
                          <span className="file-icon">
                            <i className="fas fa-upload" />
                          </span>
                          <span className="file-label">
                            Upload an Image
                          </span>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success">Save changes</button>
              <button className="button" onClick={this.toggleModal}>Cancel</button>
            </footer>
          </div>
        </div>
        <div className="container profile-content is-pt3 is-pb2">
          <div className="columns">
            <div className="column is-2">
              <figure className="image is-pl1 is-pr1 ">
                <img className="is-rounded is-pinkborder" src={image}/>
              </figure>
            </div>
            <div className="column is-8">
              <p className="title profile-author-name">{name}</p>
              <p className="is-size-6" >{bio}</p>
            </div>
            <div className="column is-2">
              <button className="button" onClick={this.toggleModal}>Edit Profile</button>
              {/* <EditProfileButton
                className={button}
              /> */}
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
  }
}

Profile.propTypes = {
  name: propTypes.string,
  bio: propTypes.string,
  image: propTypes.string
};

export default Profile;
