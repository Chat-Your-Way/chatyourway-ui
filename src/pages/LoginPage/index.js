import { lazy } from 'react';

const LazyLoginPage = lazy(() => import('./LoginPage'));

const LoginLazyPage = () => <LazyLoginPage />;

export default LoginLazyPage;
