//!TODO: Add TotalUnreadPrivatMessages
export const calculateTotalUnreadMessages = (notifications) => {
  let totalUnreadedMessages = 0;

  notifications.map((notification) => {
    totalUnreadedMessages += notification.unreadMessageCount;
  });

  return `${totalUnreadedMessages}`;
};
