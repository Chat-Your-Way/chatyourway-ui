import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, setUserInfo } from '../../../../redux/userSlice';
// import { useContext } from 'react';
// import { useSelector } from 'react-redux';
// import { getUserInfo } from '../../../../redux/userSlice';

import { useMediaQuery } from 'react-responsive';
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
// eslint-disable-next-line max-len
import { selectAccessToken } from '../../../../redux/authOperatonsToolkit/authOperationsThunkSelectors';
import localLogOutUtil from '../../../../utils/localLogOutUtil';
// import { selectUserThunk } from '../../../../redux/userApiThunk/userApiThunkSelectors';
// import { useUser } from '../../../../hooks/useUser';
// import { useNavigate } from 'react-router-dom';
// import { PATH } from '../../../../constans/routes';

const HeaderUserInfo = () => {
  const dispatch = useDispatch();
  const accessTokenInStore = useSelector(selectAccessToken);

  const { toggleTheme, currentTheme } = useContext(ThemeContext);

  const { data, isLoading, isError, error } =
    useGetUserInfoQuery(accessTokenInStore);

  // const { localLogOut } = useUser();
  // const navigate = useNavigate();

  const { avatarId } = useSelector(getUserInfo);
  // const { nickname: userNickname, avatarId } = useSelector(selectUserThunk);

  const notificationsAllTopics = useSelector(selectAllTopicsNotifications);

  const avatarsArray = Object.values(Avatars);
  const isTablet = useMediaQuery({ query: '(min-width: 768px' });

  if (error?.data?.httpStatus === 'UNAUTHORIZED') {
    alert(
      'Сталася помилка при отриманні інформації про користувача - необхідно авторизуватись',
    );
    localLogOutUtil(dispatch);
  }
  // localLogOut();
  // navigate(PATH.MAIN);

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setUserInfo(data));
    }
  }, [dispatch, data, isLoading, isError]);

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
      {/* <UserName variant="h4">{userNickname}</UserName> */}

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
