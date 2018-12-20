import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import store from '../../../redux/store/index';
import { setKeyword } from '../../../redux/actions/search/searchAction';
import { isLoggedIn } from '../../../utilities/index';
import '../styles/header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggler = React.createRef();
    this.menu = React.createRef();
    this.navSearch = React.createRef();

    this.handleBurger = this.handleBurger.bind(this);
    this.expandNavLinks = this.expandNavLinks.bind(this);
  }

  componentDidMount() {
    const {
      toggler,
      menu,
      navSearch
    } = this;

    this.props.history.listen(() => {
      navSearch.current.value = '';
      if (toggler.current.classList.contains('is-active')) {
        toggler.current.classList.remove('is-active');
        menu.current.classList.remove('show-menu');
      }
    });
  }

  handleBurger(event) {
    event.preventDefault();
    const { toggler, menu } = this;

    toggler.current.classList.toggle('is-active');
    menu.current.classList.toggle('show-menu');
  }

  expandNavLinks() {
    if (!isLoggedIn()) {
      return (
        <div id="menu" className="nav-right" ref={this.menu}>
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
      <div id="menu" className="nav-right nav-logged-in" ref={this.menu}>
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

  searchInput = async (event) => {
    const request = {
      keywords: this.navSearch.current.value,
    };

    if (event.key === 'Enter') {
      await store.dispatch(setKeyword(request));
      this.props.history.push('search');
    }
  }

  render() {
    return (
      <nav className="nav" role="navigation" aria-label="main navigation">
        <div className="nav-left">
          <div className="nav-item">
            <input
              className="nav-search"
              type="text"
              ref={this.navSearch}
              onKeyPress={this.searchInput}
              placeholder="&#x1F50D;"
            />
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
          ref={this.toggler}
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
