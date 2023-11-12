import { memo } from 'react';
import ChatItem from './ChatItem';
import { ChatBlockDataHelper } from './ChatBlockDataHelper';
import { StyledNavLink } from './ChatsBlock.styled';
import { useLocation } from 'react-router-dom';
import { useTopicsContext } from '../TopicsContext';

const ChatsBlock = ({ isOpenChat = false, isOpenContacts = false }) => {
  const { isTopics } = useTopicsContext();
  const ChatItems = ChatBlockDataHelper(isTopics);
  const { pathname } = useLocation();
  const path = pathname.includes('topics') ? 'topics' : 'notification';
  return (
    <>
      {ChatItems.map((item, index) => {
        return (
          <StyledNavLink to={`/${path}/chat/${item.title}`} key={index}>
            <ChatItem
              isOpenChat={isOpenChat}
              isOpenContacts={isOpenContacts}
              data={item}
            />
          </StyledNavLink>
        );
      })}
    </>
  );
};

export default memo(ChatsBlock);
