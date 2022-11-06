import React from 'react';
import PropTypes from 'prop-types';
import css from './TextButton.module.css';

const TextButton = ({ type, text, onClick, ...allyProps }) => (
  <button
    className={css.button_text}
    type={type}
    onClick={onClick}
    {...allyProps}
  >
    {text}
  </button>
);

TextButton.defaultProps = {
  onClick: () => null,
  text: null,
  type: 'button',
};

TextButton.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default TextButton;
