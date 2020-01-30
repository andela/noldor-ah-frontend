/* eslint-disable no-nested-ternary */
import React from 'react';
import Parser from 'html-react-parser';
import moment from 'moment';
import Rating from 'react-rating';
import '../styles/Rating.scss';
import isLoggedIn from '../../../utilities/is-logged-in/isLoggedIn';


const SingleArticle = (article) => {
  const userRating = parseInt(localStorage.getItem('rate'), 10);
  const {
    title, description, featuredImg, User, content, likes, readingTime, createdAt
  } = article.article;
  const { eventHandler, averageRate } = article;


  const rateIcon = (isLoggedIn()) ? ((userRating > 0) ? (
    <Rating
      emptySymbol={<img className="icon empty"
        src={require('../../../static/images/star-empty.png')} />}
      fullSymbol={<img className="icon full"
        src={require('../../../static/images/star-full.png')} />}
      onChange={rate => eventHandler(rate)}
      initialRating={userRating}
      readonly
    />
  ) : (
    <Rating
      emptySymbol={<img className="icon empty"
        src={require('../../../static/images/star-empty.png')} />}
      fullSymbol={<img className="icon full"
        src={require('../../../static/images/star-full.png')} />}
      onChange={rate => eventHandler(rate)}
      initialRating={userRating}
    />
  )) : (
    <a className="login" href="/login">Please login to rate</a>
  );

  const rateText = (rateIcon.props.initialRating > 0)
    ? (`You gave this article a (${rateIcon.props.initialRating})`)
    : ('Rate this article');

  const img = article.article.featuredImg
    ? featuredImg
    : 'https://res.cloudinary.com/dstvcmycn/image/upload/v1544120726/Author%27s%20Haven/image.png';

  const articleFeatureBg = {
    backgroundImage: `url(${img})`,
    height: '300px',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  };
  return (
    <div className="container article-container is-pl3 is-pr3 ">
      <div className="article-header is-mt1">
        <p className="is-size-3 is-size-5-mobile has-text-centered  single-article-title">
          {title}</p>
        <p className="is-size-7 has-text-centered is-mt1 is-mb1 single-description ">
          {description}
          <br />
          <Rating
            emptySymbol={<img className="icon empty"
              src={require('../../../static/images/star-empty.png')} />}
            fullSymbol={<img className="icon full"
              src={require('../../../static/images/star-full.png')} />}
            initialRating={averageRate}
            readonly
          />
        </p>
        <div className="article-author is-mb1">
          <div className="edit-button"><i className="fa fa-edit" /></div>
          <figure className="image  is-70x70 ">
            {User && <img className="is-rounded article-author-image is-pinkborder"
              src={User.avatarUrl} />}
          </figure>
          <div className="article-author-details">
            {User && <a className="is-size-7 is-marginless"> {User.username}</a>}
            <div className=" is-size-7">{moment(createdAt).format('MMM Do')} &nbsp;
              <i className="fa fa-clock" />&nbsp;{readingTime}</div>
          </div>
        </div>
        <div className="featured-image-bg" style={articleFeatureBg} />
      </div>
      <div className="article-body is-mt1 has-text-justified">
        <div className="article-content is-size-6 is-size-7-mobile">{Parser(`${content}`)}</div>
        <div className="article-reaction is-pt2 is-mb1">
          <h1 />
          <span className="article-like is-mr2">
            <i className="fa fa-heart " /> {!likes ? 0 : likes}</span>
          <span className="article-share">
            <i className="fa fa-share-alt" /> &nbsp; share</span>
          <span className="article-rating is-pulled-right">
            <span className="rate-article">{rateText} &nbsp;</span>
            <span className="display-effect">
              {rateIcon}
            </span>
          </span>
        </div>
      </div>
      <div className="article-footer" />
    </div>
  );
};


export default SingleArticle;
