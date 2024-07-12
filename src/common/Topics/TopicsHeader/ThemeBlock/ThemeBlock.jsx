import { useSelector } from 'react-redux';
import {
  selectChatOpened,
  selectContactsOpened,
} from '../../../../redux/chatSlice';
import { StyledBox } from './ThemeBlock.styled';
import DefaultButton from '../../../../ui-kit/components/Button';
import { ICONS } from '../../../../ui-kit/icons';

const ThemeBlock = ({ isTopics, handleModal }) => {
  const title = isTopics ? 'Теми' : 'Повідомлення';

  const chatOpened = useSelector(selectChatOpened);
  const contactsOpened = useSelector(selectContactsOpened);

  return (
    <StyledBox chatOpened={chatOpened} contactsOpened={contactsOpened}>
      {title}
      {isTopics && (
        <DefaultButton
          label="Нова"
          endIcon={<ICONS.EDIT_SQUARE />}
          handleClick={handleModal}
        />
      )}
    </StyledBox>
  );
};

export default ThemeBlock;
