import { lazy } from 'react';

const LazySuccessSignupPage = lazy(() => import('./SuccessSignupPage'));

const SuccessSignupLazyPage = () => <LazySuccessSignupPage />;

export default SuccessSignupLazyPage;
