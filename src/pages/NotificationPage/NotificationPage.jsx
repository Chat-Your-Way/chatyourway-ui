import { Outlet } from 'react-router';
import { NotificationPageWrap } from './NotificationPage.styled';
import Topics from '../../common/Topics';

const NotificationPage = () => {
  return (
    <NotificationPageWrap>
      <Topics isTopics={false} />
      <Outlet />
    </NotificationPageWrap>
  );
};

export default NotificationPage;
