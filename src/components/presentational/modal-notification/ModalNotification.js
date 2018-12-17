import React from 'react';
import propTypes from 'prop-types';
import '../styles/ModalNotification.scss';

const ModalNotification = (props) => {
  const { status, successMessage } = props;
  let show = '';

  switch (status) {
  case 'success':
    show = 'is-active';
    break;
  default:
    show = '';
  }
  return (
    <div className={`modal ${show}`}>
      <div className="modal-background" />
      <div className="modal-content" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Signup was successful</p>
        </header>

        <section className="modal-card-body is-center">
          {successMessage}
        </section>
        <footer className="modal-card-foot">
          <a href="/" className="button is-success" id="ah-color">
          Continue to Authors Haven</a>
        </footer>
      </div>
      <button className="modal-close is-large" aria-label="close" />
    </div>
  );
};

ModalNotification.propTypes = {
  successMessage: propTypes.string.isRequired,
  status: propTypes.string,
};

export default ModalNotification;
