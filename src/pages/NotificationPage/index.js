import { lazy } from 'react';

const LazyNotificationPage = lazy(() => import('./NotificationPage'));

const NotificationLazyPage = () => <LazyNotificationPage />;

export default NotificationLazyPage;
