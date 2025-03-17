import { useSelector } from 'react-redux';
import { ICONS } from '../../../ui-kit/icons';
import { IconActivity } from '../Chat.styled';
import { selectOnlineContacts } from '../../../redux/chatSlice';

const IconActivityComponent = ({ isMyMessage, senderId }) => {
  const onlineContacts = useSelector(selectOnlineContacts);
  const onlineUser = onlineContacts.find((el) => el.id === senderId);

  // if (!onlineUser) {
  //   // Если onlineUser не найден, можно вернуть дефолтный компонент или null
  // 17.03 коментую даний код, тому що:
  // // Якщо повернути дефолтний компонент, то ломаються стилі - в залежності від
  // // власне повідомлення чи ні, має бути маржин зліва або справа.
  //   return <ICONS.NO_ACTIVITY />;
  // }
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
