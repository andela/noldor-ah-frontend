import React from 'react';

const RelatedArticle = (articles, key) => {
  const { article } = articles;
  const img = article.featuredImg !== '' ? article.featuredImg
    : 'https://res.cloudinary.com/dstvcmycn/image/upload/v1544120726/Author%27s%20Haven/image.png';
  return (
    <div key={key} className="column is-4">
      <div className="card no-border">
        <div className="card-image">
          <figure className="image is-3by2">
            <img src={img} alt={article.title} />
          </figure>
        </div>
        <div className="card-content is-paddingless">
          <div className="content is-pt1 ">
            <p className="is-size-6">{article.title}</p>
            {article.content && <p className="is-size-7 has-text-weight-light">
              {article.content.substring(0, 80)}</p>}
            <p className="title is-6 theme-color ">Read More</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedArticle;
