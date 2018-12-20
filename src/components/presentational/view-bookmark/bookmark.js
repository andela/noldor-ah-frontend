import React from 'react';
import PropTypes from 'prop-types';

const ViewBookmark = (props, key) => {
  const { read } = props;
  const { Article } = props.article;
  // console.log(Article)
  return (
    <div key={key} className="article-bookmark is-mb1">
      <p onClick={() => read(Article.slug)} className="bookmark-title title is-4">{Article.title}</p>
      {Article.description && <p className="content is-size-7">
        {Article.description.substring(0, 80)}</p>}
      <div className="bookmark-footer is-size-7">
        <span className="bookmark-author is-pr1">by  {Article.User.username}</span>
        <span className="bookmark-read-time is-pr1"><i className="fa fa-clock"/> {Article.readingTime}</span>
        {/* <span className="">
          <span><i className="fa fa-star" /></span>
          <span><i className="fa fa-star" /></span>
          <span><i className="fa fa-star" /></span>
          <span><i className="fa fa-star" /></span>
          <span><i className="fa fa-star" /></span>
        </span> */}
      </div>
      <button className="bookmark-remove is-paddingless">Remove</button>
    </div>
  );
};

export default ViewBookmark;
