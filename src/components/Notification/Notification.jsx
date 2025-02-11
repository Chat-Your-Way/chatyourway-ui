import { useEffect, useState } from 'react';

const notificationStyles = {
  base: {
    position: 'fixed',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '16px 24px',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'opacity 0.3s ease',
    zIndex: 1000,
  },
  success: { backgroundColor: '#4caf50' },
  error: { backgroundColor: '#f44336' },
  info: { backgroundColor: '#2196f3' },
  warning: { backgroundColor: '#ff9800' },
};

const Notification = ({ message, type = 'info', duration = 5000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div
      style={{
        ...notificationStyles.base,
        ...notificationStyles[type],
        opacity: visible ? 1 : 0,
      }}
    >
      {message}
    </div>
  );
};

export default Notification;
