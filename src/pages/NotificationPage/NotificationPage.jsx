/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { NotificationPageWrap } from './NotificationPage.styled';
import Topics from '../../common/Topics';
import { useTopicsContext } from '../../common/Topics/TopicsContext';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';

const NotificationPage = () => {
  const { showTopics, setІsTopics } = useTopicsContext();

  useEffect(() => {
    setІsTopics(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NotificationPageWrap>
      {showTopics ? <Topics isTopics={false} /> : null}
      <Outlet />
    </NotificationPageWrap>
  );
};

export default NotificationPage;
