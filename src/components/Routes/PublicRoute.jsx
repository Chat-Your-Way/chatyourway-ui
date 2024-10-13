import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/authOperationsToolkit/authOperationsThunkSelectors';
// import { useUser } from '../../hooks/useUser';
// import { PATH } from '../../constans/routes';
// import { useSelector } from 'react-redux';

export const PublicRoute = ({ redirectTo }) => {
  // const { isAuthenticated } = useUser();
  // return !isAuthenticated ? <Outlet /> : <Navigate to={PATH.HOMEPAGE} replace />;

  const isLoggedIn = useSelector(selectIsLoggedIn);

  return !isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} replace />;
};
