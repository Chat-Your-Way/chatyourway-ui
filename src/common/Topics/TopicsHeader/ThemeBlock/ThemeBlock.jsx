import { StyledBox } from './ThemeBlock.styled';
import DefaultButton from '../../../../ui-kit/components/Button';
import { ICONS } from '../../../../ui-kit/icons';

const ThemeBlock = ({
  isOpenChat = false,
  isOpenContacts = false,
  isTopics,
}) => {
  const title = isTopics ? 'Теми' : 'Повідомлення';
  return (
    <StyledBox isOpenChat={isOpenChat} isOpenContacts={isOpenContacts}>
      {title}
      {isTopics && (
        <DefaultButton label="Нова" endIcon={<ICONS.EDIT_SQUARE />} />
      )}
    </StyledBox>
  );
};

export default ThemeBlock;
