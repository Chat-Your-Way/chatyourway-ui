import { memo } from 'react';
import ChatItem from './ChatItem';
import { ChatBlockDataHelper } from './ChatBlockDataHelper';
import { StyledNavLink } from './ChatsBlock.styled';

const ChatsBlock = ({
  isOpenChat = false,
  isOpenContacts = false,
  isTopics,
}) => {
  const ChatItems = ChatBlockDataHelper(isTopics);
  return (
    <>
      {ChatItems.map((item, index) => {
        return (
          <StyledNavLink to={`/topics/chat/${item.title}`} key={index}>
            <ChatItem
              isOpenChat={isOpenChat}
              isOpenContacts={isOpenContacts}
              data={item}
              isTopics={isTopics}
            />
          </StyledNavLink>
        );
      })}
    </>
  );
};

export default memo(ChatsBlock);
