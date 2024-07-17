import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { NotificationPageWrap } from './NotificationPage.styled';
import Topics from '../../common/Topics';
import { useTopicsContext } from '../../common/Topics/TopicsContext';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';

const NotificationPage = () => {
  const { showTopics, setShowTopics, setІsTopics } = useTopicsContext();
  const isTablet = useMediaQuery({ query: '(max-width: 1199px)' });
  const { pathname } = useLocation();

  useEffect(() => {
    setІsTopics(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isTablet && pathname.includes('notification/chat')) {
      setShowTopics(false);
    } else {
      setShowTopics(true);
    }
  });

  return (
    <NotificationPageWrap>
      {showTopics ? <Topics isTopics={false} /> : null}
      <Outlet />
    </NotificationPageWrap>
  );
};

export default NotificationPage;
