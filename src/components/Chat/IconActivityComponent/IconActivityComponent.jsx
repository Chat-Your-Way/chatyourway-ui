import { useSelector } from 'react-redux';
import { ICONS } from '../../../ui-kit/icons';
import { IconActivity } from '../Chat.styled';
import { selectOnlineContacts } from '../../../redux/chatSlice';

const IconActivityComponent = ({ isMyMessage, senderId }) => {
  const onlineContacts = useSelector(selectOnlineContacts);
  const onlineUser = onlineContacts.find((el) => el.id === senderId);

  return (
    <IconActivity isMyMessage={isMyMessage}>
      {onlineUser.online ? <ICONS.PROPERTY_ACTIVITY /> : <ICONS.NO_ACTIVITY />}
    </IconActivity>
  );
};

export default IconActivityComponent;
