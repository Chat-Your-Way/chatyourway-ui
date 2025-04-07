//!TODO: Add TotalUnreadPrivatMessages
export const calculateTotalUnreadMessages = (notifications) => {
  let totalUnreadedMessages = 0;

  notifications.map((notification) => {
    if (notification.unreadMessages.length > 0) {
      totalUnreadedMessages += notification.unreadMessages.length;
    }
  });

  return `${totalUnreadedMessages}`;
};
