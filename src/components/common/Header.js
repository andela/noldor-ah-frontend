
import React from 'react';
import './style/header.scss';

class Header extends React.Component {
  render() {
    const isAuth = true;
    return (
      <nav className="nav_bar">
        <label className="search-bar">
          <i className="fas fa-search">search</i>
          <input type="search" name="search" placeholder="Search..."/>
        </label>
        <div className="logo-position">
          <img className="logo-size"
            // eslint-disable-next-line max-len
            src="https://res.cloudinary.com/dstvcmycn/image/upload/v1544181357/Author%27s%20Haven/image_1.png"/>
        </div>
        <nav className="global_toolbar">
          {isAuth && <ul className="is-notuser">
            <li>
              <a href="/signup" className="button theme-background has-text-white is-small">
                <strong>Sign up</strong>
              </a>
            </li>
            <li><a href="/login"className="button is-white is-small">Log in</a></li>
          </ul>
          }
          {!isAuth && <ul className="is-user">
            <li><a><i className="has-text-black fas fa-bell" /></a></li>
            <li><a><i className="has-text-black fas fa-user-circle" /></a></li>
          </ul>
          }
        </nav>
      </nav>
    );
  }
}
export default Header;
