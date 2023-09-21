import { lazy } from 'react';

const LazyAuthorizationPage = lazy(() => import('./AuthorizationPage'));

const AuthorizationLazyPage = () => <LazyAuthorizationPage />;

export default AuthorizationLazyPage;
