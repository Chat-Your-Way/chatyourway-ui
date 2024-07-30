import { createContext, useContext, useState } from 'react';

const Context = createContext(null);

export const ChatContextProvider = ({ children, ...props }) => {
  const context = useCreateChatContext(props);
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export function useChatContext() {
  const context = useContext(Context);
  if (!context) throw new Error('Use chat context within provider');
  return context;
}

const useCreateChatContext = (props) => {
  const [privateMessagesArray, setPrivateMessagesArray] = useState(
    props.privateMessagesArray || [],
  );
  const [publicMessagesArray, setPublicMessagesArray] = useState(
    props.publicMessagesArray || [],
  );

  return {
    privateMessagesArray,
    setPrivateMessagesArray,
    publicMessagesArray,
    setPublicMessagesArray,
  };
};
