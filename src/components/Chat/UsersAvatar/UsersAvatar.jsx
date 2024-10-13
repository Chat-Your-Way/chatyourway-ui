/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import { useGetSubscribersQuery } from '../../../redux/topics-operations';
// eslint-disable-next-line max-len
import { selectAccessToken } from '../../../redux/authOperationsToolkit/authOperationsThunkSelectors';
import { Avatars } from '../../../ui-kit/images/avatars';
import Avatar from '../../../ui-kit/components/Avatar';

import { useMediaQuery } from 'react-responsive';
import {
  UsersAvatarStyledList,
  UsersAvatarStyledWrapper,
  UsersAvatarStyledLi,
} from './UsersAvatarStyled';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useTopicsContext } from '../../../common/Topics/TopicsContext';
import getPrivateTopicId from '../../../utils/getPrivateTopicId';

const UsersAvatar = ({ topicId, currentTopicSubscribers }) => {
  const accessTokenInStore = useSelector(selectAccessToken);
  const isTablet = useMediaQuery({ query: '(min-width: 768px' });
  const isDesktop = useMediaQuery({ query: '(mint-width: 1200px)' });
  const { privateTopics, setPrivateTopics } = useTopicsContext();

  // It was additional request for the topic subscribers infromation, but this
  // information already exist in topicIdData request.

  // const {
  //   isLoading,
  //   isError,
  //   error,
  //   data: usersSubscribers,
  // } = useGetSubscribersQuery(
  //   { topicId, accessTokenInStore },
  //   { refetchOnFocus: true, refetchOnReconnect: true, refetchOnMountOrArgChange: 10 }
  // );

  // console.log('privateTopics', privateTopics);
  return (
    <UsersAvatarStyledWrapper>
      <UsersAvatarStyledList>
        {/* {usersSubscribers */}
        {currentTopicSubscribers
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
            currentTopicSubscribers.reduce((acuum, user, index) => {
              if (index === 4) {
                return [
                  ...acuum,
                  <UsersAvatarStyledLi
                    key={user.id}
                    $left={index === 0 ? 0 : index * (isTablet ? 30 : 10)}
                    $width={isTablet ? '180px' : isDesktop ? '220px' : '94px'}
                  >
                    {/* here must be a link to list of all contacts, 
                    who is subscribed to current topic */}
                    <Link
                      to={
                        privateTopics.some(el => el?.contact?.id === user.id)
                          ? `/home/notification/chat/${getPrivateTopicId({
                              userId: user.id,
                              privateTopics,
                            })}/${user.id}`
                          : `/home/notification/chat/${topicId}/${user.id}`
                      }
                      // to={`/home/notification/chat/${topicId}`}
                    >
                      <Avatar size={isTablet ? 'md' : 'sm'} key={index} isCurrent={'true'}>
                        {currentTopicSubscribers.length}
                      </Avatar>
                    </Link>
                  </UsersAvatarStyledLi>,
                ];
              }

              acuum.push(
                <UsersAvatarStyledLi
                  key={user.id}
                  $left={index === 0 ? 0 : index * (isTablet ? 30 : 10)}
                >
                  {/* If user permittedSendingPrivateMessage ? 
                  paste here link to private topic : just avatar */}
                  {user.permittedSendingPrivateMessage ? (
                    <Link
                      to={
                        privateTopics.some(el => el?.contact?.id === user.id)
                          ? `/home/notification/chat/${getPrivateTopicId({
                              userId: user.id,
                              privateTopics,
                            })}/${user.id}`
                          : `/home/notification/chat/${user.email}/${user.id}`
                        // `/home/notification/chat/${topicId}`
                      }
                      key={user.id}
                    >
                      {Object.values(Avatars).map(
                        (Logo, index) =>
                          user.avatarId - 1 === index && (
                            <Avatar size={isTablet ? 'md' : 'sm'} key={index} isCurrent={'true'}>
                              <Logo />
                            </Avatar>
                          )
                      )}
                    </Link>
                  ) : (
                    Object.values(Avatars).map(
                      (Logo, index) =>
                        user.avatarId - 1 === index && (
                          <Avatar size={isTablet ? 'md' : 'sm'} key={index} isCurrent={'true'}>
                            <Logo />
                          </Avatar>
                        )
                    )
                  )}
                </UsersAvatarStyledLi>
              );

              return acuum;
            }, [])
          : null}
      </UsersAvatarStyledList>
    </UsersAvatarStyledWrapper>
  );
};

export default memo(UsersAvatar);
