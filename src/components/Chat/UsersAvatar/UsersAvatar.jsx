/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import { useGetSubscribersQuery } from '../../../redux/topics-operations';
// eslint-disable-next-line max-len
import { selectAccessToken } from '../../../redux/authOperatonsToolkit/authOperationsThunkSelectors';
import { Avatars } from '../../../ui-kit/images/avatars';
import Avatar from '../../../ui-kit/components/Avatar';

import { getUserInfo } from '../../../redux/userSlice';
import { useMediaQuery } from 'react-responsive';

const UsersAvatar = ({ topicId }) => {
  const accessTokenInStore = useSelector(selectAccessToken);
  const isTablet = useMediaQuery({ query: '(min-width: 768px' });
  const {
    isLoading,
    isError,
    error,
    data: usersSubscribers,
  } = useGetSubscribersQuery({ topicId, accessTokenInStore });
  //   console.log(Object.values(Avatars));
  return (
    <div>
      <ul>
        {usersSubscribers
          ? usersSubscribers.map((user) => (
              <li key={user.id}>
                {user.avatarId}
                {Object.values(Avatars).map(
                  (Logo, index) =>
                    user.avatarId - 1 === index && (
                      <Avatar
                        size={isTablet ? 'lg' : 'md'}
                        key={index}
                        isCurrent={'true'}
                      >
                        <Logo />
                      </Avatar>
                    ),
                )}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default UsersAvatar;
