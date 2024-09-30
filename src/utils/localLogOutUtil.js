import {
  setAccessToken,
  setIsLoggedIn,
  setRefreshToken,
} from '../redux/authOperatonsToolkit/authOperationsThunkSlice';
// import { disconnectWebSocket } from '../redux/chat-operations';
import { client } from '../redux/chat-operations';
import {
  clearAllTopicsNotifications,
  clearSubscriptionAllTopicsNotify,
  clearSubscriptions,
  setConnected,
  setSubscribed,
} from '../redux/chatSlice';

const localLogOutUtil = (dispatch) => {
  dispatch(setIsLoggedIn(false));
  dispatch(setAccessToken(null));
  dispatch(setRefreshToken(null));
  // dispatch(disconnectWebSocket());
  dispatch(clearSubscriptions());
  dispatch(setSubscribed(false));
  dispatch(clearSubscriptionAllTopicsNotify());
  dispatch(setConnected(false));
  dispatch(clearAllTopicsNotifications());
  if (client.active) {
    // console.log('Client is active, deactivating');
    client.deactivate();
  }
  // client.deactivate();
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export default localLogOutUtil;
