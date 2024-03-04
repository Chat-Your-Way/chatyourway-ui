import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { BASE_URL, ajwt } from './apiParams';

import {
  clearSubscriptions,
  // setStompClient,
  setConnected,
  setHistoryMessages,
  setNewMessage,
  setNotifications,
  setSubscription,
} from './chatSlice';

const getTopicHistoryDest = '/app/history/topic/';
const subToTopicDest = '/topic/';
const subToNotificationDest = '/user/specific/notify/';
const subToErrorDest = '/user/specific/error';
const sendToPublicTopicDest = '/app/topic/public/';
// const sendToPrivateTopicDest = '/app/topic/private/'; //?!!!!!!!!!!!!!!!!!!!!

let client = null;
// Дія для підключення до WebSocket
export const connectWebSocket = () => {
  return async (dispatch) => {
    const socket = new SockJS(`${BASE_URL}/chat?Authorization=Bearer ${ajwt}`);
    client = Stomp.over(() => socket);

    console.log('client', client);

    client.connect(
      {},
      () => {
        // dispatch(setStompClient(client));
        dispatch(setConnected(true));

        console.log('Connected to WebSocket'); //!
      },
      (error) => {
        console.error('Error connecting to WebSocket:', error);
      },
    );
  };
};

// export const connectWebSocket = () => {
//   return async (dispatch) => {
//     const socket = new SockJS(`${BASE_URL}/chat?Authorization=Bearer ${ajwt}`);
//     client = Stomp.over(() => socket);

//     console.log('client', client);

//     try {
//       await new Promise((resolve, reject) => {
//         client.connect({}, resolve, reject);
//       });

//       // Після успішного підключення
//       dispatch(setConnected(true));
//       console.log('Connected to WebSocket'); //!
//     } catch (error) {
//       console.error('Error connecting to WebSocket:', error);
//     }
//   };
// };

// Дія для відключення від WebSocket
export const disconnectWebSocket = () => {
  return async (dispatch, getState) => {
    const { subscriptions } = getState().chat;
    // const { stompClient } = getState().chat;

    if (client) {
      client.disconnect((error) => {
        if (error) {
          console.error('Error disconnecting from WebSocket:', error);
        } else {
          subscriptions.forEach((subscription) => {
            const { subscriptionId } = subscription;
            if (subscriptionId) {
              client.unsubscribe(subscriptionId);
            }
          });
          dispatch(clearSubscriptions());
          dispatch(setConnected(false));
        }
      });
    }

    console.log('Disconnected from WebSocket'); //!
  };
};

// Дія для підписки на повідомлення з WebSocket
export const subscribeToMessages = (topicId) => {
  return async (dispatch) => {
    // const { stompClient } = getState().chat;

    if (client && client.connected) {
      const subscriptionToHistory = client.subscribe(
        `/user${subToTopicDest}${topicId}`,
        (message) => {
          const parsedHistoryMessages = JSON.parse(message.body);

          console.log(
            'Received message from subscribeToHistoryMessages:',
            parsedHistoryMessages,
          ); //!

          dispatch(setHistoryMessages(parsedHistoryMessages));
        },
      );

      const subscriptionToTopic = client.subscribe(
        `${subToTopicDest}${topicId}`,
        (message) => {
          const parsedNewMessage = JSON.parse(message.body);

          console.log(
            'Received NewMessage from subscribeToTopic:',
            parsedNewMessage,
          ); //!

          dispatch(setNewMessage([parsedNewMessage]));
        },
      );

      const subscriptionToNotify = client.subscribe(
        `${subToNotificationDest}${topicId}`,
        (message) => {
          const parsedNotifications = JSON.parse(message.body);

          console.log(
            'Received notifications from subscribeToNotify:',
            parsedNotifications,
          ); //!

          dispatch(setNotifications(parsedNotifications));
        },
      );

      const subscriptionToError = client.subscribe(
        `${subToErrorDest}`,
        (message) => {
          const parsedErrorMessage = JSON.parse(message.body);

          console.log(
            'Received ErrorMessage from subscribeToError:',
            parsedErrorMessage,
          ); //!
        },
      );

      // Зберігаємо підписки для подальшого відключення
      dispatch(
        setSubscription({
          type: 'history',
          subscriptionId: subscriptionToHistory.id,
        }),
      );
      dispatch(
        setSubscription({
          type: 'topic',
          subscriptionId: subscriptionToTopic.id,
        }),
      );
      dispatch(
        setSubscription({
          type: 'notify',
          subscriptionId: subscriptionToNotify.id,
        }),
      );
      dispatch(
        setSubscription({
          type: 'error',
          subscriptionId: subscriptionToError.id,
        }),
      );
    }
  };
};

// Дія для отримання історії повідомлень з WebSocket
export const getTopicHistory = (topicId) => {
  return async () => {
    // const { stompClient } = getState().chat;

    if (client && client.connected) {
      client.send(
        `${getTopicHistoryDest}${topicId}`,
        {},
        JSON.stringify({ page: 0, pageSize: 100 }),
      );
    }
  };
};

export const sendMessage = (topicId, inputMessage) => {
  return async (getState) => {
    const { connected } = getState().chat;

    if (!client || !client.connected || !connected) return;

    client.send(
      `${sendToPublicTopicDest}${topicId}`,
      {},
      JSON.stringify({ content: inputMessage }),
    );
  };
};
