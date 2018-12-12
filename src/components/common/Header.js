
import React from 'react';
import './style/header.scss';

class Header extends React.Component {
  render() {
    return (
      <nav className="nav_bar">
        <label className="search-bar">
          <i className="fas fa-search">search</i>
          <input type="search" name="search" placeholder="Search..."/>
        </label>

        <nav className="global_toolbar">

          <ul className="is-notuser">
            <li />
            <li>

              <a href="/signup" className="button theme-background has-text-white is-small">
                <strong>Sign up</strong>
              </a>


            </li>
            <li>

              <a href="/login"className="button is-white is-small">
                    Log in
              </a>


            </li>
          </ul>
          <ul className="is-user">
            <li />
            <li>
              <a><i className="has-text-black fas fa-bell" /></a>
            </li>
            <li>
              <a><i className="has-text-black fas fa-user-circle" /></a>
            </li>
          </ul>
        </nav>
      </nav>

    );
  }
}

export default Header;
