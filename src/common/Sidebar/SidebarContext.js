import { useContext, createContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { setChatOpened } from '../../redux/chatSlice';

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

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTabletAndHigher = useMediaQuery({ query: '(min-width: 768px)' });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isMobile) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
      dispatch(setChatOpened(true));
    }
  }, [isMobile, dispatch]);

  return {
    showText,
    setShowText,
    showMenu,
    setShowMenu,
    selectedCategory,
    setSelectedCategory,
    isMobile,
    isTabletAndHigher,
  };
};
