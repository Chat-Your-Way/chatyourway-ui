import { lazy } from 'react';

const LazyForgotPasswordPage = lazy(() => import('./ForgotPasswordPage'));

const ForgotPasswordLazyPage = () => <LazyForgotPasswordPage />;

export default ForgotPasswordLazyPage;
