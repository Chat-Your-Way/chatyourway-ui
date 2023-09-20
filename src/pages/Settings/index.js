import { lazy } from 'react';

const LazySettingsPage = lazy(() => import('./Settings'));

const SettingsLazyPage = () => <LazySettingsPage />;

export default SettingsLazyPage;
