/* eslint-disable no-unused-vars */
import { memo } from 'react';
import ChatItem from './ChatItem';
import { ChatBlockDataHelper } from './ChatBlockDataHelper';
import { StyledNavLink } from './ChatsBlock.styled';
import { useLocation } from 'react-router-dom';
import { useTopicsContext } from '../TopicsContext';
import { useGetAllQuery } from '../../../redux/topics-operations';

const ChatsBlock = ({ isOpenChat = false, isOpenContacts = false, filter }) => {
  const { isTopics } = useTopicsContext();
  const ChatItems = ChatBlockDataHelper(isTopics);
  const { pathname } = useLocation();
  const path = pathname.includes('topics') ? 'topics' : 'notification';

  const filterHandler = () => {
    return filter === 'favourite' ? 'favourite' : 'all';
  };

  const { data, isError } = useGetAllQuery(filterHandler());

  if (isError) {
    alert('Виникла помилка під час отримання тем');
  }

  return (
    <>
      {data &&
        data.map((item) => {
          return (
            <StyledNavLink to={`../${path}/chat/${item.id}`} key={item.id}>
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
