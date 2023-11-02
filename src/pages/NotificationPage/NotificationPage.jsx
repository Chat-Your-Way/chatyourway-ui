import { Outlet, useLocation } from 'react-router';
import { NotificationPageWrap } from './NotificationPage.styled';
import Topics from '../../common/Topics';
import Chat from '../../components/Chat';

const NotificationPage = () => {
  const { pathname } = useLocation();

  return (
    <NotificationPageWrap>
      <Topics isTopics={false} />
      {pathname === '/notification/chat' && <Chat />}
      <Outlet />
    </NotificationPageWrap>
  );
};

export default NotificationPage;
