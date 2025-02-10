import { lazy } from 'react';

const LazySendActivationEmailPage = lazy(() =>
  import('./SendActivationEmailPage'),
);

const SendActivationEmailLazyPage = () => <LazySendActivationEmailPage />;

export default SendActivationEmailLazyPage;
