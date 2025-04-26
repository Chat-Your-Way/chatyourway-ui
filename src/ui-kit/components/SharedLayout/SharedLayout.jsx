/* eslint-disable no-unused-vars */
import { Outlet } from 'react-router-dom';
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

const SharedLayout = () => {
  // const { isAuthenticated } = useUser();
  // useWebSocketConnection(isAuthenticated);
  // useSubscriptionToAllTopicsNotify(isAuthenticated);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (isLoggedIn && !isConnected) {
      dispatch(connectWebSocket(accessTokenInStore));
    }

    // return () => {
    //   if (isConnected) {
    //     dispatch(disconnectWebSocket());
    //   }
    //   // console.log('useEffect in SharedLayout');
    // };
  }, [isLoggedIn, isConnected, accessTokenInStore, dispatch]);

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
      setIsCenterOrStart(true);
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
