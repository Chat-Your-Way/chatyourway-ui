/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import { useGetSubscribersQuery } from '../../../redux/topics-operations';
// eslint-disable-next-line max-len
import { selectAccessToken } from '../../../redux/authOperatonsToolkit/authOperationsThunkSelectors';
import { Avatars } from '../../../ui-kit/images/avatars';
import Avatar from '../../../ui-kit/components/Avatar';

import { getUserInfo } from '../../../redux/userSlice';
import { useMediaQuery } from 'react-responsive';
import {
  UsersAvatarStyledList,
  UsersAvatarStyledWrapper,
  UsersAvatarStyledLi,
} from './UsersAvatarStyled';
import { memo } from 'react';

const UsersAvatar = ({ topicId }) => {
  const accessTokenInStore = useSelector(selectAccessToken);
  const isTablet = useMediaQuery({ query: '(min-width: 768px' });
  const isDesktop = useMediaQuery({ query: '(mint-width: 1200px)' });

  const {
    isLoading,
    isError,
    error,
    data: usersSubscribers,
  } = useGetSubscribersQuery({ topicId, accessTokenInStore });

  return (
    <UsersAvatarStyledWrapper>
      <UsersAvatarStyledList>
        {usersSubscribers
          ? // ? usersSubscribers.map(user => (
            //     <UsersAvatarStyledLi key={user.id}>
            //       {Object.values(Avatars).map(
            //         (Logo, index) =>
            //           user.avatarId - 1 === index && (
            //             <Avatar size={isTablet ? 'md' : 'sm'} key={index} isCurrent={'true'}>
            //               <Logo />
            //             </Avatar>
            //           )
            //       )}
            //     </UsersAvatarStyledLi>
            // ))
            usersSubscribers.reduce((acuum, user, index, array) => {
              if (index === 4) {
                return [
                  ...acuum,
                  <UsersAvatarStyledLi
                    key={user.id}
                    $left={index === 0 ? 0 : index * (isTablet ? 30 : 10)}
                    $width={isTablet ? '180px' : isDesktop ? '220px' : '94px'}
                  >
                    <Avatar
                      size={isTablet ? 'md' : 'sm'}
                      key={index}
                      isCurrent={'true'}
                    >
                      {usersSubscribers.length}
                    </Avatar>
                  </UsersAvatarStyledLi>,
                ];
              }

              acuum.push(
                <UsersAvatarStyledLi
                  key={user.id}
                  $left={index === 0 ? 0 : index * (isTablet ? 30 : 10)}
                >
                  {Object.values(Avatars).map(
                    (Logo, index) =>
                      user.avatarId - 1 === index && (
                        <Avatar
                          size={isTablet ? 'md' : 'sm'}
                          key={index}
                          isCurrent={'true'}
                        >
                          <Logo />
                        </Avatar>
                      ),
                  )}
                </UsersAvatarStyledLi>,
              );

              return acuum;
            }, [])
          : null}
      </UsersAvatarStyledList>
    </UsersAvatarStyledWrapper>
  );
};

export default memo(UsersAvatar);
