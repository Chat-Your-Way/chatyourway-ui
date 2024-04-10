/* eslint-disable no-unused-vars */
import SockJS from 'sockjs-client';
// eslint-disable-next-line import/no-unresolved
import { Stomp } from '@stomp/stompjs';
import { BASE_URL, ajwt } from './apiParams';

import {
  setAllTopicsNotifications,
  setSubscribedAllTopicsNotify,
  setHistoryMessages,
  setNewMessages,
  setNotifications,
  setSubscriptions,
  clearSubscriptions,
  setConnected,
  setSubscribed,
} from './chatSlice';

const subToAllTopicsNotificationsDest = '/user/specific/notify/topics';
const getTopicHistoryDest = '/app/history/topic/';
const subToTopicDest = '/topic/';
const subToNotificationDest = '/user/specific/notify/';
const subToErrorDest = '/user/specific/error';
const sendToPublicTopicDest = '/app/topic/public/';
// const sendToPrivateTopicDest = '/app/topic/private/'; //!TODO: sendToPrivateTopicDest

let client = null;
let reconnectTimeout = null;
const RECONNECT_DELAY = 5000;
let resubscribeTimeout = null;
const RESUBSCRYBE_DELAY = 200;

export const connectWebSocket = () => {
  return async (dispatch) => {
    const socket = new SockJS(`${BASE_URL}/chat?Authorization=Bearer ${ajwt}`);
    client = Stomp.over(() => socket);

    await new Promise((resolve, reject) => {
      client.connect(
        {},
        () => {
          dispatch(setConnected(true));
          resolve();
        },
        (error) => {
          console.error('Error connecting to WebSocket:', error);

          startReconnectTimeout(dispatch);
          reject(error);
        },
      );
    });
  };
};

const startReconnectTimeout = (dispatch) => {
  reconnectTimeout = setTimeout(() => {
    reconnectWebSocket(dispatch);
  }, RECONNECT_DELAY);
};

const reconnectWebSocket = (dispatch) => {
  clearTimeout(reconnectTimeout);

  dispatch(setConnected(false));
  dispatch(connectWebSocket());
};

export const unsubscribeFromMessages = () => {
  return async (dispatch, getState) => {
    const { subscriptions } = getState().chat;

    if (subscriptions.length === 0) return;

    await Promise.all(
      subscriptions.map(async ({ subscriptionId }) => {
        if (subscriptionId) {
          try {
            await client.unsubscribe(subscriptionId);
          } catch (error) {
            console.error('Error unsubscribing from WebSocket:', error);
          }
        }
      }),
    );

    dispatch(clearSubscriptions());
    dispatch(setSubscribed(false));

    return Promise.resolve();
  };
};

export const disconnectWebSocket = () => {
  return async (dispatch) => {
    try {
      await new Promise((resolve, _) => {
        client.disconnect(() => {
          resolve();
        });
      });

      dispatch(setConnected(false));
    } catch (error) {
      console.error('Error disconnecting from WebSocket:', error);
    }
  };
};

export const subscriptionToAllNotify = () => {
  return async (dispatch) => {
    console.log('run subscribeToAllNotify'); //!
    try {
      console.log('try subscribeToAllNotify'); //!

      await client.subscribe(
        `${subToAllTopicsNotificationsDest}`,
        (message) => {
          const parsedAllTopicsNotifications = JSON.parse(message.body);

          console.log(
            'Received notifications from subscribeToAllNotify:',
            parsedAllTopicsNotifications,
          ); //!

          dispatch(setAllTopicsNotifications(parsedAllTopicsNotifications));
        },
      );

      dispatch(setSubscribedAllTopicsNotify(true));
    } catch (error) {
      console.error('Error subscribing to All Topics notifications:', error);

      startResubscribeTimeout(dispatch);
    }
  };
};

const startResubscribeTimeout = (dispatch) => {
  resubscribeTimeout = setTimeout(() => {
    resubscribeAllTopicsNotify(dispatch);
  }, RESUBSCRYBE_DELAY);
};

const resubscribeAllTopicsNotify = (dispatch) => {
  clearTimeout(resubscribeTimeout);

  console.log('run REsubscribedAllTopicsNotify'); //!

  dispatch(setSubscribedAllTopicsNotify(false));
  dispatch(subscriptionToAllNotify());
};

export const subscribeToMessages = (topicId) => {
  return async (dispatch) => {
    try {
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
            'Received newMessage from subscribeToTopic:',
            parsedNewMessage,
          ); //!

          dispatch(setNewMessages([parsedNewMessage]));
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
          ); //! обробка помилок
        },
      );

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

      dispatch(setSubscribed(true));
    } catch (error) {
      console.error('Error subscribing to WebSocket messages:', error);
    }
  };
};

export const getTopicHistory = (topicId) => {
  return async () => {
    await client.send(
      `${getTopicHistoryDest}${topicId}`,
      {},
      JSON.stringify({ page: 0, pageSize: 100 }),
    );
  };
};

export const sendMessage = (topicId, inputMessage) => {
  return async () => {
    await client.send(
      `${sendToPublicTopicDest}${topicId}`,
      {},
      JSON.stringify({ content: inputMessage }),
    );
  };
};
