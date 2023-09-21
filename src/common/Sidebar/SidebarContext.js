import { useContext, createContext, useState } from 'react';

const Context = createContext(null);

export const SidebarContextProvider = ({ children, ...props }) => {
  const context = useCreateSidebarContext(props);
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export function useSidebarContext() {
  const context = useContext(Context);
  if (!context) throw new Error('Use Sidebar context within provider!');
  return context;
}

export const useCreateSidebarContext = function (props) {
  const [showText, setShowText] = useState(props.showText || false);

  return {
    showText,
    setShowText,
  };
};
