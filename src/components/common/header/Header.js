import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { isLoggedIn } from '../../../utilities/index';
import '../styles/header.scss';

let toggle, menu;

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleBurger = this.handleBurger.bind(this);
    this.expandNavLinks = this.expandNavLinks.bind(this);
  }

  componentDidMount() {
    toggle = document.querySelector('#menu-toggle');
    menu = document.querySelector('#menu');

    this.props.history.listen(() => {
      document.querySelector('.nav-search').value = '';
      if (toggle.classList.contains('is-active')) {
        toggle.classList.remove('is-active');
        menu.classList.remove('show-menu');
      }
    });
  }

  handleBurger(event) {
    event.preventDefault();

    toggle.classList.toggle('is-active');
    menu.classList.toggle('show-menu');
  }

  expandNavLinks() {
    if (!isLoggedIn()) {
      return (
        <div id="menu" className="nav-right">
          <div key="login" className="nav-item">
            <Link className="nav-link" to="login">
              <i className="fas fa-sign-in-alt" />
              <span>Login</span>
            </Link>
          </div>

          <div key="signup" className="nav-item">
            <Link className="nav-link" to="signup">
              <i className="fas fa-user-plus" />
              <span>Signup</span>
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div id="menu" className="nav-right nav-logged-in">
        <div key="profile" className="nav-item">
          <Link className="nav-link" to="profile">
            <i className="fas fa-user-alt" />
            <span>Profile</span>
          </Link>
        </div>

        <div key="new-article" className="nav-item">
          <Link className="nav-link" to="new-article">
            <i className="fas fa-file-alt" />
            <span>New Article</span>
          </Link>
        </div>

        <div key="favorites" className="nav-item">
          <Link className="nav-link" to="favorites">
            <i className="fas fa-star" />
            <span>Favorites</span>
          </Link>
        </div>

        <div key="logout" className="nav-item">
          <Link className="nav-link" to="logout">
            <i className="fas fa-sign-out-alt" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    );
  }

  render() {
    return (
      <nav className="nav" role="navigation" aria-label="main navigation">
        <div className="nav-left">
          <div className="nav-item">
            <input className="nav-search" type="text" placeholder="&#x1F50D;" />
          </div>
        </div>

        <div className="nav-center">
          <Link className="nav-item" to="/">
            <img id="nav-logo" src={require('../../../static/images/logo.png')} width="200" />
          </Link>
        </div>

        <a
          key="profile-toggle"
          id="menu-toggle"
          role="button"
          className="navbar-burger burger"
          data-target="menu"
          onClick={this.handleBurger}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>

        {this.expandNavLinks()}
      </nav>
    );
  }
}

Header.propTypes = {
  history: propTypes.object.isRequired,
};

export default Header;
