/* eslint-disable react/prop-types */
import React from 'react';

const Pagination = (props) => {
  const { onClick, isVisible } = props;
  const prev = isVisible === 1 ? null
    : (<li><a className="pagination-previous" onClick={onClick}>Previous</a></li>);
  const next = ((isVisible) === parseInt(localStorage.getItem('message'), 10)) ? null
    : (<li><a className="pagination-next" onClick={onClick}>Next page</a></li>);
  return (
    <ul className="pagination-list">
      { prev }
      { next }
    </ul>
  );
};

export default Pagination;
