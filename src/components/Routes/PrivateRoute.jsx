import { Navigate, Outlet } from 'react-router-dom';
// import { useUser } from '../../hooks/useUser';
// import { PATH } from '../../constans/routes';
import { useSelector } from 'react-redux';
// eslint-disable-next-line max-len
import { selectIsLoggedIn } from '../../redux/authOperationsToolkit/authOperationsThunkSelectors.js';

export const PrivateRoute = ({ redirectTo }) => {
  // const { isAuthenticated } = useUser();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // console.log('isLoggedIn', isLoggedIn);
  // return isAuthenticated ? <Outlet /> : <Navigate to={PATH.MAIN} replace />;
  return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} replace />;
};
