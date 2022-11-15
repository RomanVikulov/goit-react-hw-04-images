import { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ onClick, modalImg, modalDescr }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClick]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClick();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img
          className={css.modal_image}
          src={modalImg}
          alt={modalDescr}
          width="1280"
          height="960"
        />
      </div>
    </div>
  );
};

export default Modal;
