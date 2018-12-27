/* eslint-disable max-len */

import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import isLoggedIn from '../../../utilities/is-logged-in/isLoggedIn';

const AllArticles = (props) => {
  const { read, bookmark } = props;
  const img = props.article.featuredImg ? props.article.featuredImg
    : 'https://res.cloudinary.com/dstvcmycn/image/upload/v1544120726/Author%27s%20Haven/image.png';
  return (
    <div className="column is-4 is-effect1">
      <div className="card box is-paddingless all-article">
        <div onClick={() => read(props.article.slug)} className="card-image">
          <figure className="image is-2by1">
            <img className="is-curvedtop" src={img} alt="Placeholder image" />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <p className="is-size-6 is-uppercase">{props.article.category}</p>
            <p className=" has-text-grey is-size-7 is-uppercase">
              {moment(props.article.createdAt).format('MMM Do')} &nbsp; &nbsp;
              {props.article.readingTime}
            </p>
            <p onClick={() => read(props.article.slug)} className=" is-size-6">
              {props.article.title}
            </p>
            {props.article.content && <h6 className=" has-text-grey is-size-7 is-pb1">
              {Parser(`${props.article.content.substring(0, 100)}.....`)}
            </h6>}
            {props.article.User && <p className="is-size-6">
              &nbsp;{props.article.User.username}</p> }
          </div>
          { isLoggedIn() && <div onClick={() => bookmark(props.article.slug)} className="bookmark-button tooltip"> <span className="tooltiptext is-size-7">Bookmark article</span><i className="fa fa-bookmark" /></div>}
        </div>
      </div>
    </div>
  );
};
AllArticles.propTypes = {
  read: PropTypes.func,
  bookmark: PropTypes.func,
  article: PropTypes.object
};

export default AllArticles;
