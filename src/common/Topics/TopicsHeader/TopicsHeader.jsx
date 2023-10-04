import { memo } from 'react';
import ThemeBlock from './ThemeBlock';
import TabsBlock from './TabsBlock';
import SearchInput from '../../../ui-kit/components/Input/SearchInput';
import { StyledBox } from './TopicsHeader.styled';

const TopicsHeader = ({
  isOpenChat = false,
  isOpenContacts = false,
  isTopics,
}) => {
  const inputWidth = isOpenChat ? '360px' : isOpenContacts ? '300px' : '400px';

  return (
    <>
      <ThemeBlock
        isOpenChat={isOpenChat}
        isOpenContacts={isOpenContacts}
        isTopics={isTopics}
      />
      {isTopics && (
        <TabsBlock isOpenChat={isOpenChat} isOpenContacts={isOpenContacts} />
      )}
      <StyledBox>
        <SearchInput inputHeight="42px" inputWidth={inputWidth} />
      </StyledBox>
    </>
  );
};

export default memo(TopicsHeader);
