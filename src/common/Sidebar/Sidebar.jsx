/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import {
//   MainBox,
//   StyledBox,
//   StyledNavLink,
//   StyledText,
//   StyledContentBox,
//   Logo,
//   LogOutButton,
//   LogOutIcon,
//   StyledNavlist,
// } from './Sidebar.styled';
import {
  MainBox,
  StyledBox,
  StyledNavLink,
  StyledItem,
  StyledText,
  StyledContentBox,
  Logo,
  LogOutButton,
  LogOutIcon,
  StyledNavlistItem,
  StyledNavlist,
} from './Sidebar.styled';
import { ICONS } from '../../ui-kit/icons';
import { useSidebarContext } from './SidebarContext';
import { PATH } from '../../constans/routes';
// import { useMediaQuery } from 'react-responsive';
// import { useUser } from '../../hooks/useUser';
import { useLogoutMutation } from '../../redux/auth-operations';
import { useTopicsContext } from '../Topics/TopicsContext';
import { useDispatch, useSelector } from 'react-redux';

import localLogOutUtil from '../../utils/localLogOutUtil';
import { Triangle } from 'react-loader-spinner';
import { useMediaQuery } from 'react-responsive';
import {
  selectAccessToken,
  selectIsLoggedIn,
} from '../../redux/authOperationsToolkit/authOperationsThunkSelectors';
import { useLocalLogoutUtil } from '../../hooks/useLocalLogOutUtil';
import { toast } from 'react-toastify';

const menuRoutes = [
  {
    path: `${PATH.MAIN}${PATH.HOMEPAGE}${PATH.MAIN}${PATH.TOPICS}`,
    name: 'Чати',
    icon: <ICONS.CHAT />,
  },
  {
    path: `${PATH.MAIN}${PATH.HOMEPAGE}${PATH.MAIN}${PATH.NOTIFICATION}`,
    name: 'Повідомлення',
    icon: <ICONS.MESSAGE />,
  },
  {
    path: `${PATH.MAIN}${PATH.HOMEPAGE}${PATH.MAIN}${PATH.SETTINGS}`,
    name: 'Налаштування',
    icon: <ICONS.SETTING />,
  },
  {
    path: `${PATH.MAIN}${PATH.HOMEPAGE}${PATH.MAIN}${PATH.INFO}`,
    name: 'FAQ',
    icon: <ICONS.INFO_SQUARE />,
  },
];

// isMobile is exist in useSideBarContext. Is using mobileMediaQuery here a duplicate?
// const useMobileMediaQuery = () => useMediaQuery({ query: '(max-width: 767px)' });

const Sidebar = () => {
  const {
    showText,
    showMenu,
    setShowText,
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
  } = useSidebarContext();

  const { pathname } = useLocation();
  // const isMobile = useMobileMediaQuery();

  // const [isShowText, setIsShowText] = useState();
  // const { localLogOut } = useUser();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const { setShowTopics, showTopics } = useTopicsContext();
  const dispatch = useDispatch();
  const acccessTokenInStore = useSelector(selectAccessToken);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { logoutUtilFN } = useLocalLogoutUtil();
  // const chatOpened = useSelector(selectChatOpened);

  useEffect(() => {
    // if (pathname === PATH.HOME) {
    //   setShowText(false);
    //   setShowMenu(true);
    // } else {
    //   setShowText(true);
    // }
    // Here will be a default behavior when user login, or the logoutUtilFN was executed
    if (
      acccessTokenInStore &&
      isLoggedIn &&
      isMobile &&
      !showMenu &&
      !showText &&
      !showAdvancedMenu &&
      !showTopics & !showChat
    ) {
      setShowMenu(true);
      setShowText(true);
    } else if (
      acccessTokenInStore &&
      isLoggedIn &&
      isTablet &&
      !showMenu &&
      !showText &&
      !showAdvancedMenu &&
      !showTopics & !showChat
    ) {
      setShowMenu(true);
      setShowText(true);
    } else if (
      acccessTokenInStore &&
      isLoggedIn &&
      isDesktop &&
      !showMenu &&
      !showText &&
      !showAdvancedMenu &&
      !showTopics & !showChat
    ) {
      setShowMenu(true);
      setShowText(true);
    }

    // Here I am trying to describe the state of the showText in the SideBar
    // componen depending on the screen dimensions
    // I found a problem - only one if statement will be working. I see a situation
    // when first if statement work, and showText sets to false. But the real
    // condition needed showText ture (when showMenu && isTabletAndHigher true)

    // This block checks the value of advanced menu (the Setting and the FAQ components)
    // for different size dimensions.
    if (
      showAdvancedMenu &&
      (pathname.includes('settings') || pathname.includes('info')) &&
      isMobile
    ) {
      setShowMenu(false);
      setShowText(false);
    } else if (
      showAdvancedMenu &&
      (pathname.includes('settings') || pathname.includes('info')) &&
      isTablet
    ) {
      setShowMenu(true);
      setShowText(false);
    } else if (
      showAdvancedMenu &&
      (pathname.includes('settings') || pathname.includes('info')) &&
      isDesktop
    ) {
      setShowMenu(true);
      setShowText(true);
    }

    // This block handles the state of the SideBar component and text depending on the screen
    // demensions.
    if (showChat && pathname.includes('/chat/') && isMobile) {
      setShowMenu(false);
      setShowText(false);
    } else if (showChat && pathname.includes('/chat/') && isTablet) {
      setShowMenu(true);
      setShowText(false);
    } else if (showChat && pathname.includes('/chat/') && isDesktop) {
      setShowMenu(true);
      setShowText(false);
    }

    if (
      showTopics &&
      (pathname === '/home/topics' || pathname === '/home/notification') &&
      isMobile
    ) {
      setShowMenu(false);
      setShowText(false);
    } else if (
      showTopics &&
      (pathname === '/home/topics' || pathname === '/home/notification') &&
      isTablet
    ) {
      setShowMenu(true);
      setShowText(true);
    } else if (
      showTopics &&
      (pathname === '/home/topics' || pathname === '/home/notification') &&
      isDesktop
    ) {
      setShowMenu(true);
      setShowText(true);
    }

    // I switched to tablet screen from opened chat - and showMenu still false.
    // But showMenu must be true, always when isTabletAndHigher!
    // if (showChat && !showMenu && isTabletAndHigher) {
    //   setShowMenu(true);
    // } else if (showChat && showMenu && isMobile) {
    //   setShowMenu(false);
    // }

    // I switched from tablet to mobile when chat was opened.
    // Previous block if sets show menu to true.

    // Tablet and higher must always show SideBar and text when Topics is rendered
    // if (showTopics && !showMenu && isTabletAndHigher) {
    //   setShowText(true);
    //   setShowMenu(true);
    // }

    // Always hide SideBar if Topics is rendered for mobile size of screen
    // if (showTopics && isMobile) {
    //   setShowMenu(false);
    // }

    // I switched from tablet size and info page to mobile - and the showMenu still true
    // if (showMenu && isMobile && showAdvancedMenu) {
    //   setShowMenu(false);
    // }

    // Try to handle a situation when user logout
    // if (!acccessTokenInStore) {
    //   console.log('!accessTokenInStore');
    //   setShowMenu(false);
    //   setShowText(false);
    //   setShowAdvancedMenu(false);
    //   setShowChat(false);
    //   setShowTopics(false);
    // }
    // Try to handle situation when was error response and logout is done
    // if (
    //   isMobile &&
    //   !showMenu &&
    //   pathname === '/home' &&
    //   (showTopics || showAdvancedMenu || isChatOpened)
    // ) {
    //   console.log('Handle "after error"');
    //   setShowMenu(true);
    // }

    // if (isChatOpened && isMobile && pathname.includes('chat')) {
    // console.log('showText', showText);
    // console.log('showTopics without IF', showTopics);
    // console.log('showMenu without IF', showMenu);
    // console.log('isTablet without IF', isTablet);
    // This block is for beginning state:
    // Desktop first, after user logIn he must see a menu and text
    // if (showMenu && isMobile && showTopics) {
    //   setShowText(true);
    //   console.log('setShowText true');
    // } else if (showMenu && isTablet) {
    //   console.log('setShowText ture for Tablet');
    //   setShowText(true);
    // } else {
    //   console.log('setShowText false');
    //   setShowText(false);
    // }
  }, [
    pathname,
    showMenu,
    setShowMenu,
    showAdvancedMenu,
    setShowAdvancedMenu,
    showChat,
    setShowChat,
    isMobile,
    isTablet,
    isTabletAndHigher,
    isDesktop,
    showTopics,
    setShowText,
    acccessTokenInStore,
    isLoggedIn,
    showText,
  ]);

  // useEffect(() => {
  //   setIsShowText(showText);
  // }, [showText]);

  // This useEffect for always showing the SideBar component
  // useEffect(() => {
  //   if (!isMobile) {
  //     console.log('useEffect in component, and isMobile', isMobile);
  //     setShowMenu(true);
  //   } else {
  //     console.log('useEffect in component, and isMobile', isMobile);
  //     setShowMenu(true); // Mobile menu always true?
  //   }
  // }, [isMobile, setShowMenu]);

  const logOut = async () => {
    try {
      const { error } = await logout();

      if (error) {
        toast.error(error.data.message);
        // dispatch(setIsLoggedIn(false));
        logoutUtilFN();
        // localLogOutUtil();
        return;
      }
      // localLogOut();
      // navigate(PATH.MAIN);
      // dispatch(setIsLoggedIn(false));
      logoutUtilFN();
      // localLogOutUtil();
    } catch (error) {
      console.error('Виникла помилка:', error);
      return;
    }
  };

  const handleCategoryClick = (path) => {
    setSelectedCategory(path);
    if (
      !showTopics &&
      (path.includes('/home/topics') || path.includes('/home/notification')) &&
      isMobile
    ) {
      setShowMenu(false);
      setShowText(false);
      setShowTopics(true);
    } else if (
      !showTopics &&
      (path.includes('/home/topics') || path.includes('/home/notification')) &&
      isTabletAndHigher
    ) {
      setShowMenu(true);
      setShowText(true);
      setShowTopics(true);
    } else if (
      showTopics &&
      (path.includes('/home/topics') || path.includes('/home/notification')) &&
      isTabletAndHigher
    ) {
      setShowMenu(true);
      setShowText(true);
      setShowTopics(true);
    }
    // dispatch(setChatOpened(true));

    if (
      !showAdvancedMenu &&
      (path.includes('settings') || path.includes('info')) &&
      isMobile
    ) {
      setShowMenu(false);
      setShowText(false);
      setShowAdvancedMenu(true);
    } else if (
      !showAdvancedMenu &&
      (path.includes('settings') || path.includes('info')) &&
      isTabletAndHigher
    ) {
      setShowMenu(true);
      setShowText(false);
      setShowAdvancedMenu(true);
    } else if (
      !showAdvancedMenu &&
      (path.includes('settings') || path.includes('info')) &&
      isDesktop
    ) {
      setShowMenu(true);
      setShowText(true);
      setShowAdvancedMenu(true);
    } else if (
      showAdvancedMenu &&
      (path.includes('settings') || path.includes('info')) &&
      isTabletAndHigher &&
      (pathname.includes('setting') || pathname.includes('info'))
    ) {
      setShowMenu(true);
      setShowText(false);
      setShowAdvancedMenu(true);
    } else if (
      showAdvancedMenu &&
      (path.includes('settings') || path.includes('info')) &&
      isDesktop &&
      (pathname.includes('setting') || pathname.includes('info'))
    ) {
      setShowMenu(true);
      setShowText(true);
      setShowAdvancedMenu(true);
    } else {
      setShowAdvancedMenu(false);
    }

    // if (showChat && path.includes('chat')) {
    //   setShowChat(false);
    // }

    navigate(path);
  };

  return (
    <MainBox>
      {showMenu && (
        // <StyledBox showText={isShowText}>
        <StyledBox showText={showText}>
          <StyledContentBox>
            <Logo />
            <StyledNavlist>
              {/* <StyledItemsBox> */}
              {menuRoutes.map((route) => {
                return (
                  <StyledNavlistItem key={route.name}>
                    <StyledNavLink to={route.path} key={route.name}>
                      {({ isActive }) => (
                        <StyledItem
                          showText={showText}
                          isActive={isActive}
                          onClick={() => handleCategoryClick(route.path)}
                        >
                          {route.icon}
                          {showText && (
                            <StyledText isActive={isActive}>
                              {route.name}
                            </StyledText>
                          )}
                        </StyledItem>
                      )}
                    </StyledNavLink>
                  </StyledNavlistItem>

                  // <StyledNavLink to={route.path} key={route.name}>
                  //   {({ isActive }) => (
                  //     <StyledItem
                  //       showText={showText}
                  //       isActive={isActive}
                  //       onClick={() => handleCategoryClick(route.path)}
                  //     >
                  //       {route.icon}
                  //       {showText && <StyledText isActive={isActive}>{route.name}</StyledText>}
                  //     </StyledItem>
                  //   )}
                  // </StyledNavLink>
                );
              })}
              <StyledNavlistItem>
                <LogOutButton
                  label="Вийти"
                  startIcon={<LogOutIcon />}
                  handleClick={logOut}
                />
              </StyledNavlistItem>
            </StyledNavlist>
            {/* </StyledItemsBox> */}
          </StyledContentBox>
        </StyledBox>
      )}
    </MainBox>
  );
};

export default Sidebar;
