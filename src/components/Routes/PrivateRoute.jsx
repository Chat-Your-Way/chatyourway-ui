import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { PATH } from '../../constans/routes';

export const PrivateRoute = () => {
  const { isAuthenticated } = useUser();

  return isAuthenticated ? <Outlet /> : <Navigate to={PATH.MAIN} replace />;
};
