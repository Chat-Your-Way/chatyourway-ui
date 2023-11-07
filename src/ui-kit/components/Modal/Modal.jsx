import ReactDOM from 'react-dom';
import { memo, useEffect, useCallback } from 'react';
import { StyledBackdropBox } from './Modal.styled';

function Modal({ children, closeModal }) {
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal],
  );

  useEffect(() => {
    const body = window.document.body;
    body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return ReactDOM.createPortal(
    <StyledBackdropBox onClick={closeModal}>{children}</StyledBackdropBox>,
    document.getElementById('modal-root'),
  );
}

export default memo(Modal);
