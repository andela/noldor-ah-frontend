import React from 'react';

const RelatedArticle = (article) => {
  return (

    <div className="column is-4">
      <div className="card no-border">
        <div className="card-image">
          <figure className="image is-3by2">
            <img src={article.featureImg} alt={article.title} />
          </figure>
        </div>
        <div className="card-content is-paddingless">
          <div className="content is-pt1 ">
            <p className="title is-5 is-pb1">{article.title}</p>
            <p className="subtitle is-6 is-pb1"> {article.description}</p>
            <p className="title is-6 theme-color ">{article.slug}</p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedArticle;
