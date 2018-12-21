import React from 'react';
import propTypes from 'prop-types';
import './styles/SocialMediaButton.scss';

const SocialButton = (props) => {
  const {
    className, href, text, onClick
  } = props;
  return (
    <div onClick={onClick}>
      <a href={href}>
        <button className={className}>
          {/* <span className="icbon">
            <i className={`fab ${fonticon}`} />
          </span> */}
          {text}
        </button>
      </a>
    </div>
  );
};

SocialButton.propTypes = {
  text: propTypes.string.isRequired,
  className: propTypes.string.isRequired,
  onClick: propTypes.func,
  // fonticon: propTypes.string.isRequired,
  href: propTypes.string,
};

export default SocialButton;
