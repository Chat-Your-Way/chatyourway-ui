import { StyledBox } from './ThemeBlock.styled';
import DefaultButton from '../../../../ui-kit/components/Button';
import { ICONS } from '../../../../ui-kit/icons';

const ThemeBlock = ({
  isOpenChat = false,
  isOpenContacts = false,
  isTopics,
  handleBTNFunc,
}) => {
  const title = isTopics ? 'Теми' : 'Повідомлення';
  return (
    <StyledBox isOpenChat={isOpenChat} isOpenContacts={isOpenContacts}>
      {title}
      {isTopics && (
        <DefaultButton
          label="Нова"
          endIcon={<ICONS.EDIT_SQUARE />}
          handleClick={handleBTNFunc}
        />
      )}
    </StyledBox>
  );
};

export default ThemeBlock;
