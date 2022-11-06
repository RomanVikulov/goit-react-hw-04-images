import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ preview, original, description, onImageClick }) => {
  return (
    <img
      className={css.gallery_image}
      src={preview}
      data-source={original}
      alt={description}
      onClick={() => {
        onImageClick(description, original);
      }}
      loading="lazy"
      width="240"
      height="170"
    />
  );
};

ImageGalleryItem.propTypes = {
  preview: PropTypes.string,
  original: PropTypes.string,
  description: PropTypes.string,
  onImageClick: PropTypes.func,
};

export default ImageGalleryItem;
