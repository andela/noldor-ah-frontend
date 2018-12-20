import React from 'react';
import propTypes from 'prop-types';
import '../styles/Input.scss';

const Input = (props) => {
  const {
    name, title, type,
    value, onChange, placeholder,
    className, required, pattern,
    id, parentClass,
  } = props;

  return (
    <div className={parentClass}>
      <label htmlFor={name} className="form-label">
        {title}
      </label>
      <input
        id={id}
        className={className}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        pattern={pattern}
      />
    </div>
  );
};

Input.propTypes = {
  name: propTypes.string,
  title: propTypes.string,
  type: propTypes.string,
  value: propTypes.string,
  onChange: propTypes.func,
  placeholder: propTypes.string,
  className: propTypes.string,
  parentClass: propTypes.string,
  id: propTypes.string,
  required: propTypes.bool,
  pattern: propTypes.string,
};

Input.defaultProps = {
  name: '',
  title: '',
  type: '',
  value: '',
  placeholder: '',
  className: 'form-control',
  id: '',
  required: false,
  pattern: null,
  parentClass: 'form-group'
};

export default Input;
