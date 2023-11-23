import { useState, useEffect } from 'react';
import {
  StyledPopUpNotification,
  CloseButton,
  NotificationWrapper,
  NotificationIcon,
  NotificationText,
} from './PopUpNotification.styled';

const PopUpNotification = ({ messages }) => {
  const [visible, setVisible] = useState(true);

  const closeNotification = () => {
    setVisible(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      closeNotification();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleIconClick = () => {
    closeNotification();
  };

  return (
    <StyledPopUpNotification isVisible={visible}>
      {messages.map((message, index) => (
        <NotificationWrapper key={index}>
          <NotificationIcon onClick={handleIconClick} />
          <NotificationText variant="p">{message}</NotificationText>
        </NotificationWrapper>
      ))}
      <CloseButton onClick={handleIconClick} />
    </StyledPopUpNotification>
  );
};

export default PopUpNotification;
