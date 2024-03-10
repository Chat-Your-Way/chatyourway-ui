/* eslint-disable no-unused-vars */

import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { BASE_URL, ajwt } from './apiParams';

import {
  setHistoryMessages,
  setNewMessage,
  setNotifications,
  setSubscriptions,
  clearSubscriptions,
  setConnected,
  setSubscripted,
} from './chatSlice';

const getTopicHistoryDest = '/app/history/topic/';
const subToTopicDest = '/topic/';
const subToNotificationDest = '/user/specific/notify/';
const subToErrorDest = '/user/specific/error';
const sendToPublicTopicDest = '/app/topic/public/';
// const sendToPrivateTopicDest = '/app/topic/private/'; //?!!!!!!!!!!!!!!!!!!!!

let client = null;

// export const connectWebSocket = () => {
//   return async (dispatch) => {
//     const socket = new SockJS(`${BASE_URL}/chat?Authorization=Bearer ${ajwt}`);
//     client = Stomp.over(() => socket);

//     console.log('client connectWebSocket', client); //!
//     console.log('client.connected 1 connectWebSocket', client.connected); //!

//     await client.connect(
//       {},
//       () => {
//         // dispatch(setStompClient(client));

//         dispatch(setConnected(true));

//         console.log('client.connected 2 connectWebSocket', client.connected); //!

//         console.log('Connected to WebSocket'); //!
//       },
//       (error) => {
//         console.error('Error connecting to WebSocket:', error);
//       },
//     );
//   };
// };

export const connectWebSocket = () => {
  return async (dispatch) => {
    const socket = new SockJS(`${BASE_URL}/chat?Authorization=Bearer ${ajwt}`);
    client = Stomp.over(() => socket);

    console.log('client connectWebSocket', client); //!
    console.log('client.connected 1 connectWebSocket', client.connected); //!

    await new Promise((resolve, reject) => {
      client.connect(
        {},
        () => {
          // dispatch(setStompClient(client));

          dispatch(setConnected(true));

          console.log('client.connected 2 connectWebSocket', client.connected); //!

          console.log('Connected to WebSocket'); //!
          resolve();
        },
        (error) => {
          console.error('Error connecting to WebSocket:', error);
          reject(error);
        },
      );
    });
  };
};

export const disconnectWebSocket = () => {
  return async (dispatch, getState) => {
    if (client && client.connected) {
      try {
        const { subscriptions } = getState().chat;

        console.log('subscriptions disconnectWebSocket REDUX', subscriptions); //!

        subscriptions.forEach(({ subscriptionId }) => {
          if (subscriptionId) {
            client.unsubscribe(subscriptionId);
          }
        });

        await new Promise((resolve, _) => {
          client.disconnect(() => {
            resolve();
          });
        });

        dispatch(clearSubscriptions()); //?!
        dispatch(setConnected(false));
        dispatch(setSubscripted(false));
        console.log('Disconnected from WebSocket'); //!
      } catch (error) {
        console.error('Error disconnecting from WebSocket:', error);
      }
    }
  };
};

// export const unsubscribeFromMessages = () => {
//   return async (dispatch, getState) => {
//     const { subscriptions } = getState().chat;

//     console.log('subscriptions disconnectWebSocket REDUX', subscriptions); //!

//     await Promise.all(
//       subscriptions.map(async ({ subscriptionId }) => {
//         if (subscriptionId) {
//           await client.unsubscribe(subscriptionId);
//         }
//       }),
//     );

//     dispatch(clearSubscriptions()); //?!

//     dispatch(setSubscripted(false));
//   };
// };

export const subscribeToMessages = (topicId) => {
  return async (dispatch) => {
    console.log('subscribeToMessages'); //!

    if (client && client.connected) {
      console.log('client.connected subscribeToMessages', client.connected); //!

      const subscriptionToHistory = await client.subscribe(
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

      const subscriptionToTopic = await client.subscribe(
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

      const subscriptionToNotify = await client.subscribe(
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

      const subscriptionToError = await client.subscribe(
        `${subToErrorDest}`,
        (message) => {
          const parsedErrorMessage = JSON.parse(message.body);

          console.log(
            'Received ErrorMessage from subscribeToError:',
            parsedErrorMessage,
          ); //!
        },
      );

      //! для подальшого відключення
      dispatch(
        setSubscriptions({
          type: 'history',
          subscriptionId: subscriptionToHistory.id,
        }),
      );
      dispatch(
        setSubscriptions({
          type: 'topic',
          subscriptionId: subscriptionToTopic.id,
        }),
      );
      dispatch(
        setSubscriptions({
          type: 'notify',
          subscriptionId: subscriptionToNotify.id,
        }),
      );
      dispatch(
        setSubscriptions({
          type: 'error',
          subscriptionId: subscriptionToError.id,
        }),
      );

      dispatch(setSubscripted(true));
    }
  };
};

export const getTopicHistory = (topicId) => {
  return async () => {
    // const { stompClient } = getState().chat;
    console.log('getTopicHistory redux 1'); //!

    if (client && client.connected) {
      console.log('getTopicHistory redux client+ 2'); //!

      await client.send(
        `${getTopicHistoryDest}${topicId}`,
        {},
        JSON.stringify({ page: 0, pageSize: 100 }),
      );
    }
  };
};

export const sendMessage = (topicId, inputMessage) => {
  return async () => {
    // console.log('connected sendMessage', connected); //!

    if (!client || !client.connected) return;
    // if (!client || !client.connected || !connected) return;

    console.log('sendMessage redux'); //!

    await client.send(
      `${sendToPublicTopicDest}${topicId}`,
      {},
      JSON.stringify({ content: inputMessage }),
    );
  };
};
