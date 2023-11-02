import { memo } from 'react';
import ThemeBlock from './ThemeBlock';
import TabsBlock from './TabsBlock';
import { StyledBox, StyledSearchInput } from './TopicsHeader.styled';

const TopicsHeader = ({
  isOpenChat = false,
  isOpenContacts = false,
  isTopics,
  handleBTNFunc,
}) => {
  return (
    <>
      <ThemeBlock
        isOpenChat={isOpenChat}
        isOpenContacts={isOpenContacts}
        isTopics={isTopics}
        handleBTNFunc={handleBTNFunc}
      />
      {isTopics && (
        <TabsBlock isOpenChat={isOpenChat} isOpenContacts={isOpenContacts} />
      )}
      <StyledBox>
        <StyledSearchInput />
      </StyledBox>
    </>
  );
};

export default memo(TopicsHeader);
