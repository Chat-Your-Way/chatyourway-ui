/* eslint-disable no-unused-vars */
import { useContext, createContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
  // const [showMenu, setShowMenu] = useState(props.showText || true);
  const [showMenu, setShowMenu] = useState(props.showMenu || true);
  const [showAdvancedMenu, setShowAdvancedMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({
    query: '(min-width: 768px) and (max-width: 1199px)',
  });
  const isTabletAndHigher = useMediaQuery({ query: '(min-width: 768px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1200px)' });
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (isMobile) {
  //     // setShowMenu(false);
  //     // setShowAdvancedMenu(true);
  //   } else {
  //     setShowMenu(true);
  //     // setShowAdvancedMenu(true);
  //     dispatch(setChatOpened(true));
  //   }
  // }, [isMobile, dispatch]);

  return {
    showText,
    setShowText,
    showMenu,
    setShowMenu,
    showChat,
    setShowChat,
    selectedCategory,
    setSelectedCategory,
    isMobile,
    isTablet,
    isTabletAndHigher,
    isDesktop,
    showAdvancedMenu,
    setShowAdvancedMenu,
  };
};
