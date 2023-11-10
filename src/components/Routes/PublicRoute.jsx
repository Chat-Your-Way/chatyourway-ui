import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { PATH } from '../../constans/routes';

export const PublicRoute = () => {
  const { isAuthenticated } = useUser();

  return !isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={PATH.HOMEPAGE} replace />
  );
};
