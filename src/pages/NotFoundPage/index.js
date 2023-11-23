import { lazy } from 'react';

const LazyNotFoundPage = lazy(() => import('./NotFoundPage'));

const NotFoundLazyPage = () => <LazyNotFoundPage />;

export default NotFoundLazyPage;