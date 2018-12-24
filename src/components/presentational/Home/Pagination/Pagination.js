/* eslint-disable react/prop-types */
import React from 'react';
import '../style.scss';
import Paginator from './Paginator/Paginator';

const Pagination = (props) => {
  const nextPage = '>';
  const previousPage = '<';
  const {
    onClick, extremePages, isVisible, reference
  } = props;
  const startPage = isVisible;
  const arr = Paginator(startPage);
  const el = [];
  const prev = isVisible === 1
    ? (<a className="button pagination-previous is-static" onClick={onClick}>{previousPage}</a>)
    : (<a className="pagination-previous" onClick={onClick}>{previousPage}</a>);
  const next = ((isVisible) === parseInt(localStorage.getItem('message'), 10))
    ? <a className="button pagination-previous is-static" onClick={onClick}>{nextPage}</a>
    : (<a className="pagination-next" onClick={onClick}>{nextPage}</a>);

  const last = '>>';
  const first = '<<';
  const lastPage = <a className="pagination-link last" onClick={extremePages}>{last}</a>;
  const firstPage = <a className="pagination-link first" onClick={extremePages}>{first}</a>;

  for (let i = 0; i < arr.length; i += 1) {
    el.push(<a className="pagination-link" onClick={onClick} key={i} value={arr[i]}>{arr[i]}</a>);
  }
  return (<nav className="pagination" role="navigation" aria-label="pagination">
    <ul className="pagination-list">
      <span className="page-info">
        {localStorage.getItem('pageInfo')}&nbsp;&nbsp;
      </span>
      <li ref={reference} >
        {firstPage}
        {prev}
        {el}
        {next}
        {lastPage}
      </li>
    </ul>
  </nav>);
};

export default Pagination;
