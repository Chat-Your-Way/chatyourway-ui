import {
  setAllTopicsNotifications,
  setNewMessages,
  addNewMessage,
  setOnlineContacts,
} from '../redux/chatSlice';
const registry = new Map();

export const registerSubscription = (id, destination) => {
  const callback = restoreCallbackById(id);
  registry.set(id, { destination, callback });
};

export const getSubscriptionById = (id) => {
  return registry.get(id) || null;
};

export const clearRegistry = () => {
  registry.clear();
};

export const restoreCallbackById = (id, dispatch, getState) => {
  if (id.startsWith('topic-subscription-')) {
    return (message) => {
      const parsed = JSON.parse(message.body);
      dispatch(setNewMessages([parsed]));
    };
  }

  if (id === 'online-and-typing') {
    return (message) => {
      if (message.body) {
        dispatch(setOnlineContacts([JSON.parse(message.body)]));
      }
    };
  }

  if (id === 'all-topics-notification') {
    return (message) => {
      const parsed = JSON.parse(message.body);
      const currentUserEmail = getState().currentUser.email;
      const senderData = parsed.topicSubscribers.find(
        (user) => user.nickname === parsed.lastMessage.sentFrom,
      );
      dispatch(
        addNewMessage({
          lastMessageData: parsed.lastMessage,
          senderData,
          currentUserEmail,
        }),
      );
      dispatch(setAllTopicsNotifications([parsed]));
    };
  }

  return null;
};
