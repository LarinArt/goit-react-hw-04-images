import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, Wrapper } from './Modal.style';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    return () => window.removeEventListener('keydown', closeModal);
  });

  const closeModal = ({ code, target, currentTarget }) => {
    if (code === 'Escape' || target === currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Backdrop onClick={closeModal}>
      <Wrapper>{children}</Wrapper>
    </Backdrop>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
