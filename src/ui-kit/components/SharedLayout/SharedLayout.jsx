/* eslint-disable no-unused-vars */
import { Outlet, useNavigate } from 'react-router-dom';
import MainBackground from '../MainBackground';
import Header from '../../../components/Layouts/Header';
import Footer from '../../../components/Layouts/Footer';
import Sidebar from '../../../common/Sidebar';
// import { useUser } from '../../../hooks/useUser';
import { useWebSocketConnection } from '../../../hooks/useWebSocketConnection';
import { useSubscriptionToAllTopicsNotify } from '../../../hooks/useSubscriptionToAllTopicsNotify';
import { MainWrapper } from './SharedLayout.styled';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line max-len
import {
  selectIsLoggedIn,
  selectAccessToken,
} from '../../../redux/authOperationsToolkit/authOperationsThunkSelectors';
import { useLocalLogoutUtil } from '../../../hooks/useLocalLogOutUtil';
import { useAllTopicsNotificationInfo } from '../../../hooks/useAllTopicsNotificationInfo';
import { useSidebarContext } from '../../../common/Sidebar/SidebarContext';
import { useEffect, useState } from 'react';
import { useTopicsContext } from '../../../common/Topics/TopicsContext';
import { selectChatOpened, selectConnected } from '../../../redux/chatSlice';
import { useSharedLayoutContext } from '../../../hooks/useSharedLayoutContext';
// import { useGetUserInfoQuery } from '../../../redux/user-operations';
// import { useEffect } from 'react';
// import { setIsLoggedIn } from '../../../redux/authOperatonsToolkit/authOperationsThunkSlice';
// import { setUserInfo } from '../../../redux/userSlice';
// import { getUserInfoThunk } from '../../../redux/userApiThunk/userApiThunkSlice';
// import { selectJwtExpired } from '../../../redux/userApiThunk/userApiThunkSelectors';

import {
  connectWebSocket,
  disconnectWebSocket,
} from '../../../redux/chat-operations';
import { BASE_URL } from '../../../redux/apiParams';
import { PATH } from '../../../constans/routes';

const SharedLayout = () => {
  // const { isAuthenticated } = useUser();
  // useWebSocketConnection(isAuthenticated);
  // useSubscriptionToAllTopicsNotify(isAuthenticated);
  const dispatch = useDispatch();
  const [tokenChecked, setTokenChecked] = useState(false);

  const { isCenterOrStart, setIsCenterOrStart } = useSharedLayoutContext();
  const {
    showText,
    setShowText,
    showMenu,

    setShowMenu,
    showAdvancedMenu,
    setShowAdvancedMenu,
    showChat,
    setShowChat,
    selectedCategory,
    setSelectedCategory,
    isMobile,
    isTablet,
    isTabletAndHigher,
    isDesktop,
  } = useSidebarContext();
  const { showTopics } = useTopicsContext();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isConnected = useSelector(selectConnected);
  const accessTokenInStore = useSelector(selectAccessToken);
  const chatOpened = useSelector(selectChatOpened);

  const { logoutUtilFN } = useLocalLogoutUtil();
  const navigate = useNavigate();

  useEffect(() => {
    async function checkToken(token) {
      const res = await fetch(`${BASE_URL}/auth/check-token`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        logoutUtilFN();
        navigate(`/${PATH.LOGIN}`);
      } else {
        setTokenChecked(true);
      }
    }
    if (accessTokenInStore) {
      checkToken(accessTokenInStore);
    }
  }, [logoutUtilFN, accessTokenInStore, navigate]);

  useEffect(() => {
    if (tokenChecked && accessTokenInStore && !isConnected) {
      dispatch(connectWebSocket(accessTokenInStore));
    }

    // return () => {
    //   dispatch(disconnectWebSocket());
    //   // console.log('useEffect in SharedLayout');
    // };
  }, [tokenChecked, isConnected, accessTokenInStore, dispatch]);

  // useWebSocketConnection();
  // useSubscriptionToAllTopicsNotify(isLoggedIn);
  useAllTopicsNotificationInfo(isLoggedIn);

  useEffect(() => {
    if (
      !showMenu &&
      !showText &&
      !showTopics &&
      !showChat &&
      isTabletAndHigher
    ) {
      setIsCenterOrStart(true);
    } else if (
      showMenu &&
      showText &&
      !showTopics &&
      !showChat &&
      isTabletAndHigher
    ) {
      setIsCenterOrStart(false);
    } else {
      setIsCenterOrStart(false);
    }
  }, [
    showMenu,
    showText,
    showTopics,
    showChat,
    isTabletAndHigher,
    setIsCenterOrStart,
  ]); // ??????????????????????????????????????????????????????????

  return (
    <MainBackground>
      <Header />
      <main>
        <MainWrapper isCenterOrStart={isCenterOrStart}>
          {/* {isAuthenticated && <Sidebar />} */}
          {isLoggedIn && <Sidebar />}
          <Outlet />
        </MainWrapper>
      </main>
      <Footer />
    </MainBackground>
  );
};

export default SharedLayout;
