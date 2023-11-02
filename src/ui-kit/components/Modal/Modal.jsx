import ReactDOM from 'react-dom';
import { memo } from 'react';
import { StyledBackdropBox } from './Modal.styled';

function Modal({ children, closeModal }) {
  return ReactDOM.createPortal(
    <StyledBackdropBox onClick={closeModal}>{children}</StyledBackdropBox>,
    document.getElementById('modal-root'),
  );
}

export default memo(Modal);
