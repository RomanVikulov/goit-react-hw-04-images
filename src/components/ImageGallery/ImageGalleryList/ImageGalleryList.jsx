import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGalleryList.module.css';

const ImageGalleryList = ({ images, ...otherProps }) => {
  return (
    <ul className={css.gallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <li className={css.gallery_item} key={id}>
          <ImageGalleryItem
            original={largeImageURL}
            preview={webformatURL}
            description={tags}
            {...otherProps}
          />
        </li>
      ))}
    </ul>
  );
};

ImageGalleryList.propTypes = {
  otherProps: PropTypes.any,
  images: PropTypes.array,
};

export default ImageGalleryList;
