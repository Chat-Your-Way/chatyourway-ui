import { useSelector } from 'react-redux';
import { ICONS } from '../../../ui-kit/icons';
import { IconActivity } from '../Chat.styled';
import { selectOnlineContacts } from '../../../redux/chatSlice';

const IconActivityComponent = ({ isMyMessage, senderId }) => {
  const onlineContacts = useSelector(selectOnlineContacts);
  const onlineUser = onlineContacts.find((el) => el.id === senderId);

  if (!onlineUser) {
    // Если onlineUser не найден, можно вернуть дефолтный компонент или null
    return <ICONS.NO_ACTIVITY />;
  }
  return (
    <IconActivity isMyMessage={isMyMessage}>
      {onlineUser?.online ? (
        onlineUser?.permittedSendingPrivateMessage ? (
          <ICONS.PROPERTY_ACTIVITY />
        ) : (
          <ICONS.BAN_NOTIFICATION />
        )
      ) : (
        <ICONS.NO_ACTIVITY />
      )}
    </IconActivity>
  );
};

export default IconActivityComponent;
