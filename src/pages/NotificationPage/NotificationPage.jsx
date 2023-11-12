import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { NotificationPageWrap } from './NotificationPage.styled';
import Topics from '../../common/Topics';
import { useTopicsContext } from '../../common/Topics/TopicsContext';

const NotificationPage = () => {
  const { setІsTopics } = useTopicsContext();

  useEffect(() => {
    setІsTopics(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NotificationPageWrap>
      <Topics isTopics={false} />
      <Outlet />
    </NotificationPageWrap>
  );
};

export default NotificationPage;
