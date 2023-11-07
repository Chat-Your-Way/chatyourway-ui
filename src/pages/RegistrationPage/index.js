import { lazy } from 'react';

const LazyRegistrationPage = lazy(() => import('./RegistrationPage'));

const RegistrationLazyPage = () => <LazyRegistrationPage />;

export default RegistrationLazyPage;
