import { nanoid } from 'nanoid';

const getTime = (timestamp) => {
  const dateObject = new Date(timestamp);
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  const time = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;

  return time;
};

const processMessageData = (data, email, messagesData, notifications) => {
  console.log('worked processMessageData', messagesData);

  const messages = messagesData.map((messageData) => {
    const { content, timestamp, sentFrom } = messageData;

    const subscriber = data.topicSubscribers.find(
      ({ contact }) => contact.email === sentFrom,
    );
    const notification = notifications.find(
      (notification) => notification.email === sentFrom,
    );

    const message = {
      id: nanoid(),
      topicId: notification?.topicId, //?! not used
      avatarId: subscriber?.contact.avatarId,
      name: subscriber?.contact.nickname,
      time: getTime(timestamp),
      text: content,
      isMyMessage: sentFrom === email,
      isOnline: notification?.status !== 'OFFLINE',
    };

    return message;
  });

  return messages;
};

export default processMessageData;
