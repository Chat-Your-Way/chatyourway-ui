/* eslint-disable no-unused-vars */
import { useInView } from 'react-intersection-observer';
import { MessageContainer } from '../Chat.styled';

const MessageContainerObserver = ({
  chatWrapIdRef,
  dataId,
  isMyMessage,
  messageStatus,
  children,
}) => {
  const {
    ref: observerRef,
    inView,
    observerEntries,
  } = useInView({
    root: chatWrapIdRef.current,
    threshold: 0.8,
    onChange: (inView, entry) => {
      //   console.log('inView', inView);
      //   console.log('entry', entry);
      //   console.log('dataId', dataId);
    },
  });

  return (
    <MessageContainer
      ref={messageStatus ? observerRef : null}
      data-id={dataId}
      isMyMessage={isMyMessage}
      messageStatus={messageStatus}
    >
      {children}
    </MessageContainer>
  );
};

export default MessageContainerObserver;
