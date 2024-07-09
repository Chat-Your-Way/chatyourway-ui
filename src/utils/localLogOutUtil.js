import {
  setAccessToken,
  setIsLoggedIn,
  setRefreshToken,
} from '../redux/authOperatonsToolkit/authOperationsThunkSlice';
import { disconnectWebSocket } from '../redux/chat-operations';

const localLogOutUtil = (dispatch) => {
  dispatch(setIsLoggedIn(false));
  dispatch(setAccessToken(null));
  dispatch(setRefreshToken(null));
  dispatch(disconnectWebSocket());
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export default localLogOutUtil;
