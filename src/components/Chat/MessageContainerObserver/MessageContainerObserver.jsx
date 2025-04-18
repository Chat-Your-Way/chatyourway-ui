/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import { useInView } from 'react-intersection-observer';
import { MessageContainer } from '../Chat.styled';
import { useSetMessageStatusMutation } from '../../../redux/messagesAPI/messagesAPI';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken } from '../../../redux/authOperationsToolkit/authOperationsThunkSelectors';
import { useEffect, useState } from 'react';
import { deletReadedAllTopicsNotification } from '../../../redux/chatSlice';

const MessageContainerObserver = ({
  chatWrapIdRef,
  messageId,
  isMyMessage,
  messageStatus,
  children,
  isFirstUnreadMessage,
  foundMessage,
}) => {
  const dispatch = useDispatch();
  const accessTokenInStore = useSelector(selectAccessToken);
  const [
    setMessageStatus,
    { isSuccess: isSuccessMessageStatus, data: setMessageStatusData },
  ] = useSetMessageStatusMutation();
  const [changedMessageStatus, setChangedMessageStatus] =
    useState(messageStatus);

  // Useeffect for change background of not unread message
  useEffect(() => {
    if (isSuccessMessageStatus && changedMessageStatus) {
      setChangedMessageStatus(false);
      dispatch(deletReadedAllTopicsNotification(messageId));
    }
  }, [isSuccessMessageStatus, changedMessageStatus, dispatch, messageId]);

  const {
    ref: observerRef,
    inView,
    observerEntries,
  } = useInView({
    root: chatWrapIdRef.current,
    threshold: 0.9,
    onChange: (inView, entry) => {
      if (inView && changedMessageStatus) {
        setMessageStatus({ messageId, accessTokenInStore });
      }
    },
  });

  return (
    <MessageContainer
      id={`#${messageId}`}
      ref={messageStatus ? observerRef : null}
      // data-messageId={messageId}
      isMyMessage={isMyMessage}
      messageStatus={messageStatus ? changedMessageStatus : null}
      data-isFirstUnreadMessage={
        isFirstUnreadMessage.messageStatus
          ? isFirstUnreadMessage.messageStatus
          : null
      }
      foundMessage={foundMessage}
    >
      {children}
    </MessageContainer>
  );
};

export default MessageContainerObserver;
