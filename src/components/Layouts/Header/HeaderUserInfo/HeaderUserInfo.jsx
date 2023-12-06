import { useMediaQuery } from 'react-responsive';
import Avatar from '../../../../ui-kit/components/Avatar';
import { Avatars } from '../../../../ui-kit/images/avatars';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect } from 'react';
import {
  NotificationCount,
  NotificationIcon,
  StyledToogle,
  UserInfoBlock,
  UserName,
} from './HeaderUserInfo.styled';
import { Typography } from '@mui/material';
import { getUserInfo, setUserInfo } from '../../../../redux/userSlice';
import { ThemeContext } from '../../../../ui-kit/theme/ThemeProvider';
import { useGetUserInfoQuery } from '../../../../redux/user-operations';

const HeaderUserInfo = () => {
  const dispatch = useDispatch();

  const { toggleTheme, currentTheme } = useContext(ThemeContext);

  const { data, isError, isLoading } = useGetUserInfoQuery();
  const { avatarId } = useSelector(getUserInfo);

  const avatarsArray = Object.values(Avatars);
  const isTablet = useMediaQuery({ query: '(min-width: calc(845px - 0.02px)' });

  if (isError) {
    alert('Сталася помилка при отриманні інформації про користувача');
  }

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setUserInfo(data));
    }
  }, [dispatch, data, isLoading]);

  return (
    <UserInfoBlock>
      <StyledToogle
        handleChange={toggleTheme}
        isChecked={currentTheme === 'dark'}
      />
      <NotificationCount badgeContent={3}>
        <Typography level="h6">
          <NotificationIcon />
        </Typography>
      </NotificationCount>
      <UserName variant="h4">{!isLoading && data.nickname}</UserName>
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
