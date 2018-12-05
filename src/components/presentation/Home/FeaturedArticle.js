/* eslint-disable max-len */
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const FeaturedArticle = (props) => {
  const featureImgStyle = {
    backgroundImage: `url( ${'https://bulma.io/images/placeholders/128x128.png'} )`,
    backgroundSize: 'cover',
    WebkitTransition: 'all',
    msTransition: 'all',
    position: 'relative'
  };
  const { article } = props;
  return (
    <div className="container">
      <div className="columns box is-marginless is-paddingless">
        <div className="column is-8  is-curvedleft has-text-white featured-article" style={featureImgStyle}>
          <div className="feature-title-box is-pr1 is-pl1 is-pt1 is-pb1">
            <p className="title is-5 has-text-white is-uppercase">{article.title}</p>
            {article.content && <p className="is-size-7"> {article.content.substring(0, 50)}</p>}
            <button className="button theme-background">Read this article</button>
          </div>
        </div>
        <div className="column is-4 is-paddingless">
          <div className="column">
            <span className="tag grey-bg has-text-white is-medium is-uppercase">featured</span>
          </div>
          <div className="column is-uppercase">
            {moment(article.updateAt).format('MMM Do')} &nbsp;&nbsp;
            {article.readingTime}
          </div>
          <div className="column">{article.description}
          </div>
          <div className="column">
            <figure className="image is-96x96">
              {article.User && <img className="is-rounded is-pinkborder" src={article.User.avatarUrl} />}
            </figure>
            <div className="is-authorname"> is &nbsp;
              {article.User && <p className="title is-5 weight-semibold"> {article.User.username}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
FeaturedArticle.propType = {
  article: PropTypes.object
};

export default FeaturedArticle;
