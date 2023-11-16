import { lazy } from 'react';

const LazyVerificationEmailPage = lazy(() => import('./VerificationEmailPage'));

const SuccessVerificationEmailPage = () => <LazyVerificationEmailPage />;

export default SuccessVerificationEmailPage;
