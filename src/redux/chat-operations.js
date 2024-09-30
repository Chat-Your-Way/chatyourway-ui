/* eslint-disable no-unused-vars */
// import SockJS from 'sockjs-client';
// eslint-disable-next-line import/no-unresolved
import { Client } from '@stomp/stompjs';
// import { Stomp } from '@stomp/stompjs';

// import { BASE_URL } from './apiParams';

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
  setSubscriptionAllTopicsNotify,
  clearSubscriptionAllTopicsNotify,
  setUsersStatusOnlineTyping,
} from './chatSlice';
import SockJS from 'sockjs-client';
import { BASE_URL } from './apiParams';

const subToAllTopicsNotificationsDest = '/user/specific/notify/topics';
const getTopicHistoryDest = '/app/history/topic/';
const subToTopicDest = '/topic/';
const subToNotificationDest = '/user/specific/notify/';
const subToErrorDest = '/user/specific/error';
const sendToPublicTopicDest = '/app/topic/public/';
const getInformationAboutUserOnlineOrTyping = '/user/specific/notify/contacts';
// const sendToPrivateTopicDest = '/app/topic/private/'; //!TODO: sendToPrivateTopicDest

// let client = null;
// const socket = new SockJS(
// `${BASE_URL}/chat?Authorization=Bearer ${localStorage.getItem('accessToken')}`
// );
// socket.onerror = function (error) {
//   console.log(error);
// };

const stompConfig = {
  heartbeatIncoming: 7000,
  heartbeatOutgoing: 7000,
  reconnectDelay: 0,
  // webSocketFactory: function () {
  // return new SockJS(
  //   `${BASE_URL}/chat?Authorization=Bearer ${localStorage.getItem(
  //     'accessToken',
  //   )}`,
  // );
  //   return socket;
  // },
};

export const client = new Client(stompConfig);

let reconnectTimeout = null;
const RECONNECT_DELAY = 5000;
let resubscribeTimeout = null;
const RESUBSCRYBE_DELAY = 200;

// export const connectWebSocket = () => {
//   return async dispatch => {
//     await new Promise((resolve, reject) => {
//       client.activate();
//       if (client.connected) {
//         dispatch(setConnected(true));
//         resolve();
//       }
//     });
//   };
// return async dispatch => {
//   const socket = new SockJS(
//     `${BASE_URL}/chat?Authorization=Bearer ${localStorage.getItem('accessToken')}`
//   );

//   client = Stomp.over(() => socket);
//   console.log('client', client);
//   await new Promise((resolve, reject) => {
//     client.connect(
//       {},
//       () => {
//         if (client.connected) {
//           dispatch(setConnected(true));
//         }
//         resolve();
//       },
//       error => {
//         console.error('Error connecting to WebSocket:', error);
//         startReconnectTimeout(dispatch);
//         reject(error);
//       }
//     );
//   });
// };
// };

const startReconnectTimeout = (dispatch) => {
  reconnectTimeout = setTimeout(() => {
    reconnectWebSocket(dispatch);
  }, RECONNECT_DELAY);
};

const reconnectWebSocket = (dispatch) => {
  clearTimeout(reconnectTimeout);

  dispatch(setConnected(false));
  // dispatch(connectWebSocket());
};

export const unsubscribeFromAllTopicsNotify = () => {
  return async (dispatch, getState) => {
    const { subscriptionAllTopicsNotify } = getState().chat;

    if (subscriptionAllTopicsNotify.length === 0) return;

    const { subscriptionId } = subscriptionAllTopicsNotify[0];

    if (!subscriptionId) return;

    try {
      await client.unsubscribe(subscriptionId);

      dispatch(clearSubscriptionAllTopicsNotify());
      dispatch(setSubscribedAllTopicsNotify(false));
    } catch (error) {
      console.error('Error unsubscribing from WebSocket:', error);
    }
  };
};

export const unsubscribeFromMessages = () => {
  return async (dispatch, getState) => {
    const { subscriptions } = getState().chat;

    if (subscriptions.length === 0) return;

    await Promise.all(
      subscriptions.map(async ({ subscriptionId }) => {
        if (!subscriptionId) return;

        try {
          await client.unsubscribe(subscriptionId);

          dispatch(clearSubscriptions());
          dispatch(setSubscribed(false));
        } catch (error) {
          console.error('Error unsubscribing from WebSocket:', error);
        }
      }),
    );

    return Promise.resolve();
  };
};

export const disconnectWebSocket = () => {
  return async (dispatch) => {
    try {
      // await new Promise((resolve, _) => {
      //   client.disconnect(() => {
      //     resolve();
      //   });
      // });
      await new Promise((resolve, reject) => {
        client.deactivate((event) => {
          resolve();
        });
        if (!client.connected) {
          dispatch(setConnected(false));
        }
      });
    } catch (error) {
      console.error('Error disconnecting from WebSocket:', error);
    }
  };
};

export const subscribeToAllTopicsNotify = () => {
  return async (dispatch) => {
    try {
      //  const subscriptionToAllNotify = await client.subscribe(
      //     `${subToAllTopicsNotificationsDest}`,
      //     (message) => {
      //       // console.log('message', message);
      //       const parsedAllTopicsNotifications = JSON.parse(message.body);
      //       // console.log('parsedAllTopicsNotifications', parsedAllTopicsNotifications);
      // dispatch(setAllTopicsNotifications(parsedAllTopicsNotifications));
      const subscriptionToAllNotify = await client.subscribe(
        subToAllTopicsNotificationsDest,
        (message) => {
          const parsedAllTopicsNotifications = JSON.parse(message.body);

          dispatch(setAllTopicsNotifications(parsedAllTopicsNotifications));
        },
      );
      dispatch(setSubscribedAllTopicsNotify(true));
      dispatch(
        setSubscriptionAllTopicsNotify({
          type: 'all-topics',
          subscriptionId: subscriptionToAllNotify.id,
        }),
      );
    } catch (error) {
      console.error('Error subscribing to All Topics notifications:', error);

      startResubscribeTimeout(dispatch);
    }
  };
};

const startResubscribeTimeout = (dispatch) => {
  resubscribeTimeout = setTimeout(() => {
    resubscribeToAllTopicsNotify(dispatch);
  }, RESUBSCRYBE_DELAY);
};

const resubscribeToAllTopicsNotify = (dispatch) => {
  clearTimeout(resubscribeTimeout);

  dispatch(setSubscribedAllTopicsNotify(false));
  dispatch(subscribeToAllTopicsNotify());
};

export const subscribeToMessages = (topicId) => {
  return async (dispatch) => {
    try {
      const subscriptionToHistory = await client.subscribe(
        `/user${subToTopicDest}${topicId}`,
        (message) => {
          const parsedHistoryMessages = JSON.parse(message.body);

          dispatch(setHistoryMessages(parsedHistoryMessages));
        },
      );

      const subscriptionToTopic = await client.subscribe(
        `${subToTopicDest}${topicId}`,
        (message) => {
          const parsedNewMessage = JSON.parse(message.body);

          dispatch(setNewMessages([parsedNewMessage]));
        },
      );

      const subscriptionToNotify = await client.subscribe(
        `${subToNotificationDest}${topicId}`,
        (message) => {
          const parsedNotifications = JSON.parse(message.body);

          dispatch(setNotifications(parsedNotifications));
        },
      );

      const subscriptionToError = await client.subscribe(
        `${subToErrorDest}`,
        (message) => {
          const parsedErrorMessage = JSON.parse(message.body);

          // eslint-disable-next-line no-console
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
      JSON.stringify({ page: 0, pageSize: 5 }),
    );
  };
};

export const sendMessageByWs = async ({ topicId, inputMessage, dispatch }) => {
  if (!client.connected) {
    client.activate();
  }

  await client.publish({
    destination: `${sendToPublicTopicDest}${topicId}`,
    body: JSON.stringify({ content: inputMessage }),
  });

  // return async () => {
  //   await client.publish({
  //     destination: `${sendToPublicTopicDest}${topicId}`,
  //     body: JSON.stringify({ content: inputMessage }),
  //   });
  // };
};

export const subscribeOnlineOrTypingStatus = () => {
  return async (dispatch) => {
    try {
      const subscribeOnlineStatus = await client.subscribe(
        `${getInformationAboutUserOnlineOrTyping}`,
        (message) => {
          if (message.body) {
            dispatch(setUsersStatusOnlineTyping(JSON.parse(message.body)));
          }
        },
      );

      dispatch(
        setSubscriptions({
          type: 'onlineStatus',
          subscriptionId: subscribeOnlineStatus.id,
        }),
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
};

export const unSubscribeOnlineOrTypingStatus = () => {
  return async (dispatch, subscriptionOnlineStatusId) => {
    client.unsubscribe(subscriptionOnlineStatusId);
  };
};
