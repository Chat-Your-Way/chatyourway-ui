/* eslint-disable no-unused-vars */
import { memo, useState } from 'react';
import Avatar from '../../ui-kit/components/Avatar';
import IconButton from '../../ui-kit/components/IconButton/IconButton';
import { ICONS } from '../../ui-kit/icons';
import {
  ChatHeader,
  ChatInputIconBox,
  ChatInputStyled,
  ChatSection,
  ChatSectionWrap,
  ChatUserName,
  ChatWrap,
  IconActivity,
  IconSend,
  IconSmile,
  IndicatorBox,
  InfoBox,
  InfoMoreBox,
  InputBox,
  MessageContainer,
  TextMessage,
  TextMessageBlock,
  TimeIndicator,
  TypingIndicator,
  UserBox,
  UserMassageWrap,
  UserName,
} from './Chat.styled';
import { useTopicsPageContext } from '../../pages/TopicsPage/TopicsPageContext';
import DropDownMenu from './DropDownMenu/DropDownMenu';
import TopicSettingsMenu from './TopicSettingsMenu/TopicSettingsMenu';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserInfo } from '../../redux/userSlice';
import { useGetByIdQuery } from '../../redux/topics-operations';
import ChatRoom from '../ChatComponent/ChatRoom'; //!

const Chat = ({ children }) => {
  const { contactsOpen, setContactsOpen } = useTopicsPageContext();
  const [messageValue, setMessageValue] = useState('');
  const { email } = useSelector(getUserInfo);
  const { title: topicId } = useParams();
  const { data, isLoading, isError } = useGetByIdQuery(topicId);

  console.log('topicId', topicId); //!

  if (isError) {
    alert('Виникла помилка під час отримання теми');
  }

  const handleContacts = () => {
    setContactsOpen(!contactsOpen);
  };

  const handleMessageChange = (message) => {
    setMessageValue(message);
    console.log('handleMessageChange worked'); //!
  };

  const messages = [
    {
      id: 1,
      name: 'Ти',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      time: '16:28',
      isMyMessage: true,
      avatar: <Avatar />,
      isOnline: true,
    },
    {
      id: 2,
      name: 'Ім`я користувача',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      time: '16:45',
      isMyMessage: false,
      avatar: <Avatar />,
      isOnline: false,
    },
  ];

  const subscribeStatus = () => {
    console.log('data from subscribeStatus', data); //!

    if (data) {
      const status = data.topicSubscribers.find(
        (el) => el.contact.email === email && el.unsubscribeAt === null,
      );

      console.log('status from subscribeStatus', status); //!

      return status ? true : false;
    }

    console.log('isError', isError); //!
  };

  return (
    !isLoading && (
      <ChatWrap>
        <ChatHeader>
          <UserBox>
            <Avatar />
            <InfoBox>
              <ChatUserName variant="h5">
                {data ? data.topicName : 'імя користувача'}
              </ChatUserName>
              <TypingIndicator variant="h5">Ти/Пишеш...</TypingIndicator>
            </InfoBox>
          </UserBox>
          <InfoMoreBox>
            {children}
            <TopicSettingsMenu
              topicId={topicId}
              subscribeStatus={subscribeStatus()}
            />
          </InfoMoreBox>
        </ChatHeader>
        <ChatSectionWrap>
          <ChatSection>
            {messages.map((item) => (
              <ChatSection key={item.id} isMyMessage={item.isMyMessage}>
                <MessageContainer isMyMessage={item.isMyMessage}>
                  <UserMassageWrap>
                    <IndicatorBox isMyMessage={item.isMyMessage}>
                      <TimeIndicator isMyMessage={item.isMyMessage}>
                        {item.time}
                      </TimeIndicator>
                      <IconActivity isMyMessage={item.isMyMessage}>
                        {item.isOnline ? (
                          <ICONS.PROPERTY_ACTIVITY />
                        ) : (
                          <ICONS.NO_ACTIVITY />
                        )}
                      </IconActivity>
                      <UserName variant="h5">{item.name}</UserName>
                    </IndicatorBox>
                    <TextMessageBlock>
                      <TextMessage isMyMessage={item.isMyMessage}>
                        {item.text}
                      </TextMessage>
                      {!item.isMyMessage && <DropDownMenu />}
                    </TextMessageBlock>
                  </UserMassageWrap>
                  <Avatar />
                </MessageContainer>
              </ChatSection>
            ))}
            <ChatRoom />
          </ChatSection>
          <InputBox>
            <ChatInputStyled
              value={messageValue}
              maxRows={3}
              placeholder="Введіть повідомлення..."
              onChange={(e) => handleMessageChange(e.target.value)}
            />
            <ChatInputIconBox>
              <IconButton icon={<IconSmile />} />
              <IconButton icon={<IconSend />} />
            </ChatInputIconBox>
          </InputBox>
        </ChatSectionWrap>
      </ChatWrap>
    )
  );
};
export default memo(Chat);
