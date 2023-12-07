import { lazy } from 'react';

const LazyFaqPage = lazy(() => import('./FaqPage'));

const FaqPageLazy = () => <LazyFaqPage />;

export default FaqPageLazy;
