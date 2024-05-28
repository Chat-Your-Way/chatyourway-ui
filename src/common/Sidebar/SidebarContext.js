import { useContext, createContext, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

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
  const [showText, setShowText] = useState(props.showText || true);
  const [showMenu, setShowMenu] = useState(props.showText || true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const isMobile = useMediaQuery({ query: '(max-width: 769px)' });

  useEffect(() => {
    if (isMobile) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  }, [isMobile]);

  return {
    showText,
    setShowText,
    showMenu,
    setShowMenu,
    selectedCategory,
    setSelectedCategory,
  };
};
