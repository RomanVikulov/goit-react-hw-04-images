import React from 'react';
import PropTypes from 'prop-types';
import css from './IconButton.module.css';

export const IconButton = ({ type, children, onClick, ...allyProps }) => (
  <button
    className={css.button_icon}
    type={type}
    onClick={onClick}
    {...allyProps}
  >
    {children}
  </button>
);

IconButton.defaultProps = {
  type: 'button',
  onClick: () => null,
  children: null,
};

IconButton.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  'aria-label': PropTypes.string.isRequired,
};

export default IconButton;
