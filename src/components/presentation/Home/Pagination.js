import React from 'react';

const Pagination = (props) => {
  const { onClickNext } = props;
  return (
    <ul className="pagination-list">
      <li><a className="pagination-previous" onClick ={onClickNext}>Previous</a></li>
      <li><a className="pagination-next">Next page</a></li>
    </ul>
  );
};

export default Pagination;
