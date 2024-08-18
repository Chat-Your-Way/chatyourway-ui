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

const TopicsHeader = ({
  handleModal,
  active,
  setFilter,
  searchInputValue,
  setSearchInputValue,
}) => {
  const { isTopics } = useTopicsContext();

  const chatOpened = useSelector(selectChatOpened);

  const contactsOpened = useSelector(selectContactsOpened);

  return (
    <>
      <ThemeBlock isTopics={isTopics} handleModal={handleModal} />
      {isTopics && <TabsBlock active={active} setFilter={setFilter} />}
      <StyledBox>
        <StyledSearchInput
          value={searchInputValue}
          handleInputValue={(event) =>
            setSearchInputValue(event.currentTarget.value.trim())
          }
          $chatOpened={chatOpened}
          $contactsOpened={contactsOpened}
        />
      </StyledBox>
    </>
  );
};

export default memo(TopicsHeader);
