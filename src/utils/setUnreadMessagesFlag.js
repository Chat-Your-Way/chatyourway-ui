// eslint-disable-next-line no-unused-vars
const setUnreadMessageFlag = ({ arrayOfMessages, unreadMessages }) => {
  // let tempValue = unreadMessageCount;

  // if (tempValue === 0) {
  //   return arrayOfMessages;
  // } else {
  //   const result = arrayOfMessages.reduce((acuum, el) => {
  //     if (tempValue !== 0) {
  //       tempValue -= 1;
  //       return [...acuum, { ...el, messageStatus: 'unread' }];
  //     } else return [...acuum, el];
  //   }, []);
  //   return result;
  // }
  if (unreadMessages.length === 0) {
    return arrayOfMessages;
  }

  const result = arrayOfMessages.map((el) => {
    if (unreadMessages.find((unreadEl) => unreadEl.id === el.id)) {
      return { ...el, messageStatus: 'unread' };
    } else return el;
  });

  return result;
};

export default setUnreadMessageFlag;
