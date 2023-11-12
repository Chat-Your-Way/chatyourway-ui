import { useContext, createContext, useState } from 'react';

const Context = createContext(null);

export const TopicsContextProvider = ({ children, ...props }) => {
  const context = useCreateTopicsContext(props);
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export function useTopicsContext() {
  const context = useContext(Context);
  if (!context) throw new Error('Use Sidebar context within provider!');
  return context;
}

export const useCreateTopicsContext = function (props) {
  const [isTopics, setІsTopics] = useState(props.showText || true);

  return {
    isTopics,
    setІsTopics,
  };
};
