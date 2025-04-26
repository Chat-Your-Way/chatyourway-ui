import { useDispatch } from 'react-redux';
import {
  setAccessToken,
  setIsLoggedIn,
  setRefreshToken,
} from '../redux/authOperationsToolkit/authOperationsThunkSlice';
import {
  clearAllTopicsNotifications,
  clearSubscriptionAllTopicsNotify,
  clearSubscriptions,
  setConnected,
  setSubscribed,
} from '../redux/chatSlice';
import {
  // client,
  unsubscribeFromAllTopicsNotify,
  unSubscribeOnlineOrTypingStatus,
} from '../redux/chat-operations';
import { WebSocketManager } from '../utils/WebSocketManager';
import { useSidebarContext } from '../common/Sidebar/SidebarContext';
import { useTopicsContext } from '../common/Topics/TopicsContext';

export const useLocalLogoutUtil = () => {
  const dispatch = useDispatch();
  const {
    setShowText,
    setShowMenu,
    setShowChat,
    setSelectedCategory,
    setShowAdvancedMenu,
  } = useSidebarContext();
  const { setShowTopics } = useTopicsContext();

  const logoutUtilFN = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // setShowMenu(false);
    // setShowText(false);
    dispatch(setIsLoggedIn(false));
    dispatch(setAccessToken(null));
    dispatch(setRefreshToken(null));
    dispatch(setConnected(false));
    setShowMenu(true);
    setShowText(true);
    setShowAdvancedMenu(false);
    setShowChat(false);
    setShowTopics(false);
    setSelectedCategory(null);

    // dispatch(disconnectWebSocket());
    dispatch(clearSubscriptions());
    dispatch(setSubscribed(false));
    dispatch(clearSubscriptionAllTopicsNotify());
    dispatch(clearAllTopicsNotifications());
    dispatch(unsubscribeFromAllTopicsNotify());
    dispatch(unSubscribeOnlineOrTypingStatus());
    if (WebSocketManager.client.active) {
      // console.log('Client is active, deactivating');
      WebSocketManager.disconnect();
    }
    // client.deactivate();
  };

  return { logoutUtilFN };

  //   useEffect(() => {
  //     if (!accessTokenInStore && !isLoggedIn) {
  //   setShowMenu(false);
  //   setShowText(false);
  //   setShowAdvancedMenu(false);
  //   setShowChat(false);
  //   setShowTopics(false);
  //   setSelectedCategory(null);

  //   dispatch(setIsLoggedIn(false));
  //   dispatch(setAccessToken(null));
  //   dispatch(setRefreshToken(null));
  //   // dispatch(disconnectWebSocket());
  //   dispatch(clearSubscriptions());
  //   dispatch(setSubscribed(false));
  //   dispatch(clearSubscriptionAllTopicsNotify());
  //   dispatch(setConnected(false));
  //   dispatch(clearAllTopicsNotifications());
  //   dispatch(unsubscribeFromAllTopicsNotify());
  //   dispatch(unSubscribeOnlineOrTypingStatus());
  //   if (client.active) {
  //     // console.log('Client is active, deactivating');
  //     client.deactivate();
  //   }
  //   // client.deactivate();
  //   localStorage.removeItem('accessToken');
  //   localStorage.removeItem('refreshToken');
  // }
  //   }, [
  //     accessTokenInStore,
  //     dispatch,
  //     isLoggedIn,
  //     setSelectedCategory,
  //     setShowAdvancedMenu,
  //     setShowChat,
  //     setShowMenu,
  //     setShowText,
  //     setShowTopics,
  //   ]);
};
