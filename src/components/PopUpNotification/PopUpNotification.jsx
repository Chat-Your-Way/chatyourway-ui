import { useState, useEffect } from 'react';
import {
  StyledPopUpNotification,
  CloseButton,
  NotificationWrapper,
  NotificationIcon,
  NotificationText,
} from './PopUpNotification.styled';

const PopUpNotification = () => {
  const [visible, setVisible] = useState(true);

  const closeNotification = () => {
    setVisible(false);
  };

  const messages = [
    'Вітаємо! Лист відправлений повторно.',
    'Ще одне повідомлення.',
    'І ще одне повідомлення. Воно дуже довге те що треба для переносу строки.',
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      closeNotification();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <StyledPopUpNotification isVisible={visible}>
      {messages.map((message, index) => (
        <NotificationWrapper key={index}>
          <NotificationIcon onClick={closeNotification} />
          <NotificationText variant="h5">{message}</NotificationText>
        </NotificationWrapper>
      ))}
      <CloseButton onClick={closeNotification} />
    </StyledPopUpNotification>
  );
};

export default PopUpNotification;
