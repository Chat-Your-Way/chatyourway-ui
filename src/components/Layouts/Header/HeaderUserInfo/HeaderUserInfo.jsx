import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { getUserInfo, setUserInfo } from '../../../../redux/userSlice';
import { useGetUserInfoQuery } from '../../../../redux/user-operations';
import { selectAllTopicsNotifications } from '../../../../redux/chatSlice';
import { calculateTotalUnreadMessages } from './helperHeaderUserInfo';

import Avatar from '../../../../ui-kit/components/Avatar';
import { Avatars } from '../../../../ui-kit/images/avatars';
import { ThemeContext } from '../../../../ui-kit/theme/ThemeProvider';
import { Typography } from '@mui/material';
import {
  NotificationCount,
  NotificationIcon,
  StyledToogle,
  UserInfoBlock,
  UserName,
} from './HeaderUserInfo.styled';
import { useUser } from '../../../../hooks/useUser';

const HeaderUserInfo = () => {
  const dispatch = useDispatch();

  const { toggleTheme, currentTheme } = useContext(ThemeContext);

  const { data, isError, isLoading } = useGetUserInfoQuery();

  const { localLogOut } = useUser();

  const { avatarId } = useSelector(getUserInfo);

  const notificationsAllTopics = useSelector(selectAllTopicsNotifications);

  const avatarsArray = Object.values(Avatars);
  const isTablet = useMediaQuery({ query: '(min-width: 769px' });

  if (isError) {
    alert('Сталася помилка при отриманні інформації про користувача');
    localLogOut();
  }

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setUserInfo(data));
    }
  }, [dispatch, data, isLoading, isError, localLogOut]);

  return (
    <UserInfoBlock>
      <StyledToogle
        handleChange={toggleTheme}
        isChecked={currentTheme === 'dark'}
      />
      <NotificationCount
        badgeContent={calculateTotalUnreadMessages(notificationsAllTopics)}
      >
        <Typography level="h6">
          <NotificationIcon />
        </Typography>
      </NotificationCount>
      <UserName variant="h4">{!isLoading && data && data.nickname}</UserName>
      {avatarsArray.map(
        (Logo, index) =>
          avatarId - 1 === index && (
            <Avatar
              size={isTablet ? 'lg' : 'md'}
              key={index}
              isCurrent={'true'}
            >
              <Logo />
            </Avatar>
          ),
      )}
    </UserInfoBlock>
  );
};
export default HeaderUserInfo;
