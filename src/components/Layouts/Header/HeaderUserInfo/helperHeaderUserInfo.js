//!TODO: Add TotalUnreadPrivatMessages
export const calculateTotalUnreadMessages = (notifications) => {
  let totalUnreadedMessages = 0;

  notifications.map((notification) => {
    if (notification.unreadMessageCount) {
      totalUnreadedMessages += notification.unreadMessageCount;
    }
  });

  return `${totalUnreadedMessages}`;
};
