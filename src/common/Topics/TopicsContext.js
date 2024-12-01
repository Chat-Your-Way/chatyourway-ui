import { useContext, createContext, useState } from 'react';

const Context = createContext(null);

export const TopicsContextProvider = ({ children, ...props }) => {
  const context = useCreateTopicsContext(props);
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export function useTopicsContext() {
  const context = useContext(Context);
  if (!context) throw new Error('Use Topics context within provider!');
  return context;
}

export const useCreateTopicsContext = function (props) {
  const [isTopics, setІsTopics] = useState(props.isTopics || true);
  const [showTopics, setShowTopics] = useState(props.showText || false);
  const [privateTopics, setPrivateTopics] = useState(props.privateTopics || []);

  return {
    isTopics,
    setІsTopics,
    showTopics,
    setShowTopics,
    privateTopics,
    setPrivateTopics,
  };
};
