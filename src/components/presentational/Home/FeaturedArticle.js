/* eslint-disable max-len */
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';

const FeaturedArticle = (props) => {
  const { article, read } = props;
  const img = article.featuredImg ? article.featuredImg : 'https://res.cloudinary.com/dstvcmycn/image/upload/v1544120726/Author%27s%20Haven/image.png';
  const featureImgStyle = {
    backgroundImage: `url( ${img} )`,
    backgroundSize: 'cover',
    WebkitTransition: 'all',
    msTransition: 'all',
    position: 'flex',
    justifyContent: 'center',
  };
  return (
    <div className="container">
      <div className="columns box is-marginless is-paddingless">
        <div className="column is-8  is-curvedleft has-text-white featured-article is-paddingless " style={featureImgStyle}>
          <div className="feature-overlay is-pt3 is-pb3 is-curvedleft">
            <div className="feature-title-box is-pr1 is-pl1 is-pt1 is-pb1">
              <p className="title is-3 is-size-5-mobile has-text-white is-uppercase">{article.title}</p>
              {article.content && <p className="is-size-7 has-text-weight-light"> {Parser(`${article.content.substring(0, 100)}.....`)} </p>}
              <button onClick={() => read(article.slug)} className="button theme-background is-mt1">Read this article</button>
            </div>
          </div>
        </div>
        <div className="column is-4 is-paddingless grey-color">
          <div className="column">
            <span className="tag grey-bg has-text-white is-medium is-uppercase">featured</span>
          </div>
          <div className="column is-uppercase is-size- has-text-weight-bold">
            {moment(article.updateAt).format('MMM Do')} &nbsp;&nbsp;
            {article.readingTime}
          </div>
          <div className="column ">
            <p className="is-size-7 has-text-weight-semibold">{article.description}</p>
          </div>
          <div className="column">
            <div className="author">
              <figure className="image is-96x96">
                {article.User && <img className="is-rounded is-pinkborder" src={article.User.avatarUrl} /> }
              </figure>
              <div className="is-authorname"> by &nbsp;
                {article.User && <p className="title is-size-5 has-text-weight-semibold"> {article.User.username}</p> }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
FeaturedArticle.propTypes = {
  article: PropTypes.object.isRequired,
  read: PropTypes.func
};
export default FeaturedArticle;
