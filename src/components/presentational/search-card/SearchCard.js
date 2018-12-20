import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import '../styles/SearchCard.scss';

const SearchCard = (props) => {
  const { article } = props;

  return (
    <Link key={article.id} to={article.slug}>
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              src={article.featuredImg}
              alt="featured-img"
            />
          </figure>
        </div>
        <div className="card-content">
          <p className="title is-4">{article.title}</p>
          <p>{article.description}</p>
          <br />
          <p className="article-stats">by {article.author.username} on {article.date}</p>
        </div>
      </div>
    </Link>
  );
};

SearchCard.propTypes = {
  article: propTypes.object
};

SearchCard.defaultProps = {
  article: {}
};

export default SearchCard;
