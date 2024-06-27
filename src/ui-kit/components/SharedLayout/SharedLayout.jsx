import { Outlet } from 'react-router-dom';
import MainBackground from '../MainBackground';
import Header from '../../../components/Layouts/Header';
import Footer from '../../../components/Layouts/Footer';
import Sidebar from '../../../common/Sidebar';
// import { useUser } from '../../../hooks/useUser';
import { useWebSocketConnection } from '../../../hooks/useWebSocketConnection';
import { useSubscriptionToAllTopicsNotify } from '../../../hooks/useSubscriptionToAllTopicsNotify';
import { MainWrapper } from './SharedLayout.styled';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../redux/authOperatonsToolkit/authOperationsThunkSelectors';
// import { useGetUserInfoQuery } from '../../../redux/user-operations';
// import { useEffect } from 'react';
// import { setIsLoggedIn } from '../../../redux/authOperatonsToolkit/authOperationsThunkSlice';
// import { setUserInfo } from '../../../redux/userSlice';
// import { getUserInfoThunk } from '../../../redux/userApiThunk/userApiThunkSlice';
// import { selectJwtExpired } from '../../../redux/userApiThunk/userApiThunkSelectors';

const SharedLayout = () => {
  // const { isAuthenticated } = useUser();
  // useWebSocketConnection(isAuthenticated);
  // useSubscriptionToAllTopicsNotify(isAuthenticated);

  const isLoggedIn = useSelector(selectIsLoggedIn);

  useWebSocketConnection(isLoggedIn);
  useSubscriptionToAllTopicsNotify(isLoggedIn);

  return (
    <MainBackground>
      <Header />
      <main>
        <MainWrapper>
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
