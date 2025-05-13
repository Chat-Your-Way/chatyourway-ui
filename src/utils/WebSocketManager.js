/* eslint-disable no-console */
// eslint-disable-next-line import/no-unresolved
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { store } from '../redux/store';
import { BASE_URL } from '../redux/apiParams';
import {
  addSubscription,
  removeSubscription,
  resetConnection,
} from '../redux/chatSlice';

import { restoreCallbackById } from './registerSubscription';
// let client = null;

export const WebSocketManager = {
  client: null,
  subscriptions: new Map(),

  connect(accessToken, onConnectCallback) {
    this.client = new Client({
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      webSocketFactory: () =>
        new SockJS(
          `${BASE_URL}/chat?Authorization=Bearer ${accessToken}`,
          null,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        ),
      debug: (msg) => console.log('[STOMP Debug]:', msg),
      reconnectDelay: 5000,
      heartbeatIncoming: 7000,
      heartbeatOutgoing: 7000,
      onConnect: () => {
        console.log('🟢 WebSocket connected');
        const state = store.getState();
        const { subscriptions = [] } = state.chat;
        subscriptions.forEach(({ id, destination }) => {
          const currCallback = restoreCallbackById(
            id,
            store.dispatch,
            store.getState,
          );
          if (subscriptions.some((sub) => sub.id === id)) {
            this.subscribe(id, destination, currCallback);
          } else {
            console.warn(`No callback registered for subscription id "${id}"`);
          }
        });
        onConnectCallback?.();
      },
      onDisconnect: () => {
        console.log('🔴 WebSocket disconnected');
        if (this.client) {
          this.client.reconnectDelay = 0;
        }
        store.dispatch(resetConnection());
      },
      onWebSocketClose: () => {
        console.warn('🔴 WebSocket closed (onWebSocketClose)');
        store.dispatch(resetConnection());
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame);
        store.dispatch(resetConnection());
      },
    });

    this.client.activate();
  },

  disconnect() {
    if (this.client) {
      this.client.reconnectDelay = 0;
      if (this.client.active) {
        this.client.deactivate();
      }
      this.client = null;
    }
    Object.values(this.subscriptions).forEach((sub) => sub.unsubscribe());
    this.subscriptions.clear();
    this.client?.deactivate();
    this.subscriptions.clear();
    store.dispatch(resetConnection());
  },

  subscribe(id, destination, callback) {
    if (this.client?.connected) {
      if (this.subscriptions?.has(id)) {
        return this.subscriptions?.get(id);
      }
      try {
        const subscription = this.client.subscribe(destination, callback);
        this.subscriptions.set(id, subscription);
        store.dispatch(addSubscription({ id, destination }));
        console.log(`📩 Subscribed to ${destination} with id ${id}`);
        return subscription;
      } catch (error) {
        console.error(`❌ Failed to subscribe to ${destination}`, error);
        return null;
      }
    } else {
      store.dispatch(addSubscription({ id, destination }));
    }
  },

  unsubscribe(id) {
    const subscription = this.subscriptions.get(id);
    subscription?.unsubscribe();
    this.subscriptions.delete(id);
    store.dispatch(removeSubscription(id));
  },

  isConnected() {
    return this.client?.connected ?? false;
  },
  publish({ destination, body }) {
    if (!this.client || !this.client.connected) return;
    this.client.publish({ destination, body });
  },
  // debug: (msg) => console.log('[STOMP Debug]:', msg),
};
