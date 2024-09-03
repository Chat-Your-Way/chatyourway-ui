import { nanoid } from 'nanoid';

export const getTime = (timestamp) => {
  const dateObject = new Date(timestamp);
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const seconds = dateObject.getSeconds();

  const time = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return time;
};

// export const processMessageData = ({
//   sortedCurrentMessageByTopic,
//   historyMessages,
//   newMessages,
//   notifications,
// }) => {
//   const messagesData = [
//     ...historyMessages,
//     ...newMessages,
//     ...sortedCurrentMessageByTopic,
//   ];

export const processMessageData = ({
  sortedCurrentMessagesByTopic,
  notifications,
}) => {
  // const messagesData = [...sortedCurrentMessagesByTopic];

  const messages = sortedCurrentMessagesByTopic.map((messageData) => {
    const {
      content: messageContent,
      timestamp,
      sender,
      my: isMyMessage,
    } = messageData;

    const notification = notifications.find(
      (notification) => notification.email === sender.email,
    );

    const message = {
      id: nanoid(),
      topicId: notification?.topicId, //?! not used
      avatarId: sender.avatarId,
      name: sender.nickname,
      time: getTime(timestamp),
      text: messageContent,
      isMyMessage: isMyMessage,
      isOnline: notification?.status !== 'OFFLINE', // isOnline does not exists in array 'content'
      senderId: sender.id,
      senderEmail: sender.email,
    };

    return message;
  });
  // const messagesData = [...historyMessages, ...newMessages];

  // const messages = messagesData.map((messageData) => {
  //   const { content, timestamp, sentFrom } = messageData;

  //   const subscriber = data.topicSubscribers.find(
  //     ({ contact }) => contact.email === sentFrom,
  //   );
  //   const notification = notifications.find(
  //     (notification) => notification.email === sentFrom,
  //   );

  //   const message = {
  //     id: nanoid(),
  //     topicId: notification?.topicId, //?! not used
  //     avatarId: subscriber?.contact.avatarId,
  //     name: subscriber?.contact.nickname,
  //     time: getTime(timestamp),
  //     text: content,
  //     isMyMessage: sentFrom === email,
  //     isOnline: notification?.status !== 'OFFLINE',
  //   };

  //   return message;
  // });

  return messages;
};
