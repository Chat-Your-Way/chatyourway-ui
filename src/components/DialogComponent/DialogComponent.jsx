import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../redux/modalSlice';
import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalActions,
  CancelButton,
  ConfirmButton,
  CloseIcon,
} from './DialogComponent.styled';

const DialogModal = ({ callback }) => {
  const { isOpen, text } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (callback) {
      callback();
    }
    dispatch(closeModal());
  };

  return (
    <ModalOverlay onClick={() => dispatch(closeModal())}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseIcon onClick={() => dispatch(closeModal())} />
        <ModalTitle>{text}</ModalTitle>
        <ModalActions>
          <CancelButton onClick={() => dispatch(closeModal())}>
            Відміна
          </CancelButton>
          <ConfirmButton onClick={handleConfirm}>Підтвердити</ConfirmButton>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DialogModal;
