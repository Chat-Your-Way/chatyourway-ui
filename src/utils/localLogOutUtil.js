import {
  setAccessToken,
  setIsLoggedIn,
  setRefreshToken,
} from '../redux/authOperatonsToolkit/authOperationsThunkSlice';
// import { disconnectWebSocket } from '../redux/chat-operations';
import { client } from '../redux/chat-operations';
import { setConnected } from '../redux/chatSlice';

const localLogOutUtil = (dispatch) => {
  dispatch(setIsLoggedIn(false));
  dispatch(setAccessToken(null));
  dispatch(setRefreshToken(null));
  // dispatch(disconnectWebSocket());
  dispatch(setConnected(false));
  client.deactivate();
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export default localLogOutUtil;
