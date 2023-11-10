import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { PATH } from '../../constans/routes';
import SharedLayout from '../../ui-kit/components/SharedLayout/SharedLayout';
import AuthorizationPage from '../../pages/AuthorizationPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import ForgotPasswordPage from '../../pages/ForgotPasswordPage';
import RecoveryPasswordPage from '../../pages/RecoveryPasswordPage';
import SuccessSignupPage from '../../pages/SuccessSignupPage';
import SettingsPage from '../../pages/Settings/Settings';
import TopicsPage from '../../pages/TopicsPage';
import NotificationPage from '../../pages/NotificationPage';
import Chat from '../Chat';

const Router = () => {
  return (
    <Suspense fallback="Loading...">
      <Routes>
        {/*Public Route*/}
        <Route path={PATH.MAIN} element={<PublicRoute />}>
          <Route path={PATH.MAIN} element={<SharedLayout />}>
            <Route index element={<AuthorizationPage />} />
            <Route path={PATH.LOGIN} element={<LoginPage />} />
            <Route
              path={PATH.FORGOT_PASSWORD}
              element={<ForgotPasswordPage />}
            />
            <Route
              path={PATH.RECOVERY_PASSWORD}
              element={<RecoveryPasswordPage />}
            />
          </Route>
        </Route>

        {/*Private Route*/}
        <Route path={PATH.MAIN} element={<PrivateRoute />}>
          <Route path={PATH.MAIN} element={<SharedLayout />}>
            <Route path={PATH.SUCCESS_SIGNUP} element={<SuccessSignupPage />} />
            <Route path={PATH.TOPICS} element={<TopicsPage />}>
              <Route path={PATH.CHAT} element={<Chat />} />
            </Route>
            <Route path={PATH.NOTIFICATION} element={<NotificationPage />}>
              <Route path={PATH.CHAT} element={<Chat />} />
            </Route>
            <Route path={PATH.SETTINGS} element={<SettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
