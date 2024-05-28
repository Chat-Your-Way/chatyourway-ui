import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { PATH } from '../../constans/routes';
import SharedLayout from '../../ui-kit/components/SharedLayout/SharedLayout';
// import Loader from '../Loader';
import AuthorizationPage from '../../pages/AuthorizationPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegistrationPage from '../../pages/RegistrationPage';
import ForgotPasswordPage from '../../pages/ForgotPasswordPage';
import RecoveryPasswordPage from '../../pages/RecoveryPasswordPage';
import SuccessSignupPage from '../../pages/SuccessSignupPage';
import SettingsPage from '../../pages/Settings/Settings';
import TopicsPage from '../../pages/TopicsPage';
import NotificationPage from '../../pages/NotificationPage';
import NotFoundPage from '../../pages/NotFoundPage';
import VerificationEmailPage from '../../pages/VerificationEmailPage';
import FaqPage from '../../pages/FaqPage';
import Chat from '../Chat/Chat';
import LoaderTemplate from '../LoaderTemplate';

const Router = () => {
  return (
    <Suspense fallback={<LoaderTemplate />}>
      <Routes>
        {/*Public Route*/}
        <Route path={PATH.MAIN} element={<PublicRoute />}>
          <Route path={PATH.MAIN} element={<SharedLayout />}>
            <Route index element={<AuthorizationPage />} />
            <Route path={PATH.LOGIN} element={<LoginPage />} />
            <Route path={PATH.REGISTER} element={<RegistrationPage />} />
            <Route
              path={PATH.FORGOT_PASSWORD}
              element={<ForgotPasswordPage />}
            />
            <Route
              path={PATH.RECOVERY_PASSWORD}
              element={<RecoveryPasswordPage />}
            />
            <Route path={PATH.SUCCESS_SIGNUP} element={<SuccessSignupPage />} />
            <Route
              path={PATH.VERIFICATION_EMAIL}
              element={<VerificationEmailPage />}
            />
          </Route>
        </Route>

        {/*Private Route*/}
        <Route path={PATH.MAIN} element={<PrivateRoute />}>
          <Route path="loadertemplate" element={<LoaderTemplate />} />
          <Route path={PATH.HOMEPAGE} element={<SharedLayout />}>
            <Route path={PATH.TOPICS} element={<TopicsPage />}>
              <Route path={PATH.CHAT} element={<Chat />} />
            </Route>
            <Route path={PATH.NOTIFICATION} element={<NotificationPage />}>
              <Route path={PATH.CHAT} element={<Chat />} />
            </Route>
            <Route path={PATH.SETTINGS} element={<SettingsPage />} />
            <Route path={PATH.INFO} element={<FaqPage />} />
          </Route>
        </Route>

        <Route path={PATH.NOT_FOUND} element={<SharedLayout />}>
          <Route path={PATH.NOT_FOUND} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
