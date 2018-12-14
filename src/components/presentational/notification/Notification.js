import React from 'react';
import propTypes from 'prop-types';
import '../styles/Notification.scss';

const Notification = (props) => {
  const { status, message, display } = props;
  let color = '';
  const style = {
    display
  };

  switch (status) {
  case 'success':
    color = 'is-success';
    break;
  case 'error':
    color = 'is-danger';
    break;
  default:
    color = 'is-info';
  }

  return (
    <div style={style}
      className={`notification ${color}`}
    >
      {message}
    </div>
  );
};

Notification.propTypes = {
  status: propTypes.string,
  message: propTypes.string,
  display: propTypes.string,
};

Notification.defaultProps = {
  status: '',
  message: '',
  display: 'none',
};

export default Notification;
