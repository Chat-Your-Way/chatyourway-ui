// eslint-disable-next-line no-unused-vars
const setUnreadMessageFlag = ({ arrayOfMessages, unreadMessageCount }) => {
  let tempValue = unreadMessageCount;

  if (tempValue === 0) {
    return arrayOfMessages;
  } else {
    const result = arrayOfMessages.reduce((acuum, el) => {
      if (tempValue !== 0) {
        tempValue -= 1;
        return [...acuum, { ...el, messageStatus: 'unread' }];
      } else return [...acuum, el];
    }, []);
    return result;
  }
};

export default setUnreadMessageFlag;
