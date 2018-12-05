import React from 'react';

const AllArticles = (article) => {
  return (
    <div className="column is-4 is-effect1">
      <div className="card box is-paddingless ">
        <div className="card-image">
          <figure className="image is-2by1">
            <img className="is-curvedtop" src={article.featureImg} alt="Placeholder image" />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <p className="title is-5 is-pb1">FOOD</p>
            <p className="subtitle has-text-grey is-5 is-pb1 is-uppercase">today 5 mins </p>
            <p className="title is-5"> title</p>
            <p className="subtitle has-text-grey is-5 is-pb1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
            <p className="title is-5">by Hope</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllArticles;
