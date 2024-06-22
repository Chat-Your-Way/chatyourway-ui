import { Navigate, Outlet } from 'react-router-dom';
// import { useUser } from '../../hooks/useUser';
// import { PATH } from '../../constans/routes';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/authOperatonsToolkit/authOperationsThunkSelectors.js';

export const PrivateRoute = ({ redirectTo }) => {
  // const { isAuthenticated } = useUser();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // return isAuthenticated ? <Outlet /> : <Navigate to={PATH.MAIN} replace />;
  return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} replace />;
};
