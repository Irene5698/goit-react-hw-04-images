import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';


const ImageGalleryItem = (props) => {
  const [showModal, setshowModal] = useState(false);

  const toggleModal = () => {
    setshowModal(true);
  };

  const onClose = () => {
    setshowModal(false);
  };

  const { tags, largeImageURL, webformatURL } = props;
  return (
    <li className={css.imageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        onClick={toggleModal}
        className={css.imageGallery}
      />
      {showModal && (
        <Modal
          onClose={onClose}
          image={largeImageURL}
          tags={tags}
          showModal={showModal}
        />
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;