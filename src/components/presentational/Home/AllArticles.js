
import React from 'react';
import moment from 'moment';

const AllArticles = (article) => {
  const img = article.featureImg ? article.featureImg
    : 'https://res.cloudinary.com/dstvcmycn/image/upload/v1544120726/Author%27s%20Haven/image.png';
  return (
    <div className="column is-4 is-effect1">
      <div className="card box is-paddingless all-article ">
        <div className="card-image">
          <figure className="image is-2by1">
            <img className="is-curvedtop" src={img} alt="Placeholder image" />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <p className="is-size-6 is-uppercase">{article.article.category}</p>
            <p className=" has-text-grey is-size-7 is-uppercase">
              {moment(article.article.createdAt).format('MMM Do')} &nbsp; &nbsp;
              {article.article.readingTime}
            </p>
            <p className=" is-size-6">
              {article.article.title}
            </p>
            {article.article.content && <p className=" has-text-grey is-size-7 is-pb1">
              {article.article.content.substring(0, 100)}.....
            </p>}
            {article.article.User && <p className="is-size-6">
              &nbsp;{article.article.User.username}</p> }
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllArticles;
