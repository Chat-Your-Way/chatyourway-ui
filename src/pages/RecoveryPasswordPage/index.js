import { lazy } from 'react';

const LazyRecoveryPasswordPage = lazy(() => import('./RecoveryPasswordPage'));

const RecoveryPasswordLazyPage = () => <LazyRecoveryPasswordPage />;

export default RecoveryPasswordLazyPage;
