import React from 'react';


const SingleArticle = (article) => {
  const {
    title, description, featuredImg, User, content, likes, readingTime
  } = article.article;
  const img = article.article.featuredImg
    ? featuredImg
    : 'https://res.cloudinary.com/dstvcmycn/image/upload/v1544120726/Author%27s%20Haven/image.png';


  return (
    <div className="container article-container is-pl3 is-pr3">
      <div className="article-header ">
        <p className="is-size-3 is-size-5-mobile has-text-centered  single-article-title">
          {title}</p>
        <p className="is-size-7 has-text-centered is-mt1 is-mb single-description ">
          {description}
        </p>
        <p className="has-text-centered is-size-7 has-text-weight-semibold is-mb1" >
          <i className="fa fa-clock" />&nbsp;{readingTime}</p>
        <img className="is-featured-img " src={img} alt=""/>
      </div>
      <div className="article-body is-mt1 has-text-justified">
        <div className="article-profile">
          <figure className="image is-author-img-size">
            {User && <img className="is-rounded is-pinkborder" src={User.avatarUrl}/>}

          </figure>
          <div className="is-author-name">
            <p className="is-size-7">Authored by</p>
            {User && <p className="is-size-6 has-text-weight-semibold">{User.username}</p>}

          </div>
        </div >
        <div className="article-content is-size-6 is-size-7-mobile">{content}</div>
        <div className="article-reaction is-pt2">
          <span className="article-like is-mr2">
            <i className="fa fa-heart " /> { !likes ? 0 : likes }</span>

          <span className="article-share">
            <i className="fa fa-share-alt" /> &nbsp; share</span>
        </div>
      </div>
      <div className="article-footer" />
    </div>
  );
};


export default SingleArticle;
