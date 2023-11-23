import { useState, useEffect } from 'react';
import {
  StyledPopUpNotification,
  CloseButton,
  NotificationWrapper,
  NotificationIcon,
  NotificationText,
} from './PopUpNotification.styled';

const PopUpNotification = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <StyledPopUpNotification visible={visible}>
      <NotificationWrapper>
        <NotificationIcon />
        <NotificationText>{message}</NotificationText>
      </NotificationWrapper>
      <CloseButton />
    </StyledPopUpNotification>
  );
};

export default PopUpNotification;
