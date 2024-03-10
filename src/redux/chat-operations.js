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
// const sendToPrivateTopicDest = '/app/topic/private/'; //!TODO: sendToPrivateTopicDest

let client = null;

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
          reject(error);
        },
      );
    });
  };
};

export const unsubscribeFromMessages = () => {
  return async (dispatch, getState) => {
    const { subscriptions } = getState().chat;

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
    dispatch(setSubscripted(false));

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
