import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectChatOpened, selectContactsOpened } from '../../redux/chatSlice';
import { TopicsWrapper } from './Topics.styled';
import ChatsBlock from './ChatsBlock';
import TopicsHeader from './TopicsHeader';

const Topics = ({ handleBTNTopicFunc, handleModal }) => {
  const [filter, setFilter] = useState('all');
  const [searchInputValue, setSearchInputValue] = useState('');

  const chatOpened = useSelector(selectChatOpened);
  const contactsOpened = useSelector(selectContactsOpened);

  return (
    <TopicsWrapper chatOpened={chatOpened} contactsOpened={contactsOpened}>
      <TopicsHeader
        handleModal={handleModal}
        active={filter}
        setFilter={setFilter}
        searchInputValue={searchInputValue}
        setSearchInputValue={setSearchInputValue}
      />
      <ChatsBlock
        handleBTNTopicFunc={handleBTNTopicFunc}
        filter={filter}
        searchInputValue={searchInputValue}
        setSearchInputValue={setSearchInputValue}
      />
    </TopicsWrapper>
  );
};

export default memo(Topics);
