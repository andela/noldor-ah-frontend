
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const AllArticles = (props) => {
  const { read } = props;
  const img = props.article.featuredImg ? props.article.featuredImg
    : 'https://res.cloudinary.com/dstvcmycn/image/upload/v1544120726/Author%27s%20Haven/image.png';
  return (
    <div className="column is-4 is-effect1">
      <div onClick={() => read(props.article.slug)} className="card box is-paddingless all-article">
        <div className="card-image">
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
            <p className=" is-size-6">
              {props.article.title}
            </p>
            {props.article.content && <p className=" has-text-grey is-size-7 is-pb1">
              {props.article.content.substring(0, 100)}.....
            </p>}
            {props.article.User && <p className="is-size-6">
              &nbsp;{props.article.User.username}</p> }
          </div>
        </div>
      </div>
    </div>
  );
};
AllArticles.propTypes = {
  read: PropTypes.func,
  article: PropTypes.object
};

export default AllArticles;
