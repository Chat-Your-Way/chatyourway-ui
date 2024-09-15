/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import { useInView } from 'react-intersection-observer';
import { MessageContainer } from '../Chat.styled';
import { useSetMessageStatusMutation } from '../../../redux/messagesAPI/messagesAPI';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../../redux/authOperatonsToolkit/authOperationsThunkSelectors';

const MessageContainerObserver = ({
  chatWrapIdRef,
  messageId,
  isMyMessage,
  messageStatus,
  children,
  isFirstUnreadMessage,
}) => {
  const accessTokenInStore = useSelector(selectAccessToken);
  const [setMessageStatus, { isLoading: isLoadingMessageStatus }] =
    useSetMessageStatusMutation();

  const {
    ref: observerRef,
    inView,
    observerEntries,
  } = useInView({
    root: chatWrapIdRef.current,
    threshold: 0.8,
    onChange: (inView, entry) => {
      if (inView) {
        setMessageStatus({ messageId, accessTokenInStore });
      }
    },
  });

  return (
    <MessageContainer
      id={`#${messageId}`}
      ref={messageStatus ? observerRef : null}
      data-messageId={messageId}
      isMyMessage={isMyMessage}
      messageStatus={messageStatus ? messageStatus : null}
      data-isFirstUnreadMessage={
        isFirstUnreadMessage.messageStatus
          ? isFirstUnreadMessage.messageStatus
          : null
      }
    >
      {children}
    </MessageContainer>
  );
};

export default MessageContainerObserver;
