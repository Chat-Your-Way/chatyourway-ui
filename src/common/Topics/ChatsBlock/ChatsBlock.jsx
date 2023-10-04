import { memo } from 'react';
import ChatItem from './ChatItem';
import { ChatBlockDataHelper } from './ChatBlockDataHelper';

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
          <ChatItem
            isOpenChat={isOpenChat}
            isOpenContacts={isOpenContacts}
            key={index}
            data={item}
            isTopics={isTopics}
          />
        );
      })}
    </>
  );
};

export default memo(ChatsBlock);
