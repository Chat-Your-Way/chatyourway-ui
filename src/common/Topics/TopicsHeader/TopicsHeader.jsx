import { memo } from 'react';
import { useSelector } from 'react-redux';
import {
  selectChatOpened,
  selectContactsOpened,
} from '../../../redux/chatSlice';
import ThemeBlock from './ThemeBlock';
import TabsBlock from './TabsBlock';
import { StyledBox, StyledSearchInput } from './TopicsHeader.styled';
import { useTopicsContext } from '../TopicsContext';

const TopicsHeader = ({ handleBTNFunc, active, setFilter }) => {
  const { isTopics } = useTopicsContext();

  const chatOpened = useSelector(selectChatOpened);

  console.log('chatOpened', chatOpened);
  const contactsOpened = useSelector(selectContactsOpened);

  return (
    <>
      <ThemeBlock isTopics={isTopics} handleBTNFunc={handleBTNFunc} />
      {isTopics && <TabsBlock active={active} setFilter={setFilter} />}
      <StyledBox>
        <StyledSearchInput
          chatOpened={chatOpened}
          contactsOpened={contactsOpened}
        />
      </StyledBox>
    </>
  );
};

export default memo(TopicsHeader);
