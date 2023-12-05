import { memo } from 'react';
import ThemeBlock from './ThemeBlock';
import TabsBlock from './TabsBlock';
import { StyledBox, StyledSearchInput } from './TopicsHeader.styled';
import { useTopicsContext } from '../TopicsContext';

const TopicsHeader = ({
  isOpenChat = false,
  isOpenContacts = false,
  handleBTNFunc,
  active,
  setFilter,
}) => {
  const { isTopics } = useTopicsContext();
  return (
    <>
      <ThemeBlock
        isOpenChat={isOpenChat}
        isOpenContacts={isOpenContacts}
        isTopics={isTopics}
        handleBTNFunc={handleBTNFunc}
      />
      {isTopics && (
        <TabsBlock
          isOpenChat={isOpenChat}
          isOpenContacts={isOpenContacts}
          active={active}
          setFilter={setFilter}
        />
      )}
      <StyledBox>
        <StyledSearchInput />
      </StyledBox>
    </>
  );
};

export default memo(TopicsHeader);
