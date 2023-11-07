import { lazy } from 'react';

const LazyTopicsPage = lazy(() => import('./TopicsPage'));

const SuccessTopicsPage = () => <LazyTopicsPage />;

export default SuccessTopicsPage;
