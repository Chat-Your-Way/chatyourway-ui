/* eslint-disable no-unused-vars */
import {
  HeaderWrap,
  Logo,
  CategoryIcon,
  StyledIconButton,
  AuthSection,
} from './Header.styled';
import { useSidebarContext } from '../../../common/Sidebar/SidebarContext';
import Wrapper from '../Wrapper';
// import { useUser } from '../../../hooks/useUser';
import { PATH } from '../../../constans/routes';
import { NavLink, useLocation } from 'react-router-dom';
import HeaderUserInfo from './HeaderUserInfo';
import { useTopicsContext } from '../../../common/Topics/TopicsContext';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line max-len
import { selectIsLoggedIn } from '../../../redux/authOperationsToolkit/authOperationsThunkSelectors';
import { selectChatOpened, setChatOpened } from '../../../redux/chatSlice';
import { useMediaQuery } from 'react-responsive';

const Header = () => {
  const {
    showMenu,
    setShowMenu,
    setShowText,
    showAdvancedMenu,
    setShowAdvancedMenu,
    showChat,
    setShowChat,
    isMobile,
    isTablet,
    isTabletAndHigher,
    isDesktop,
    selectedCategory,
  } = useSidebarContext();
  const { showTopics, setShowTopics } = useTopicsContext();
  const { pathname } = useLocation();
  const path = pathname.includes('chat') ? 'chat' : 'notifications';

  // const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const chatOpened = useSelector(selectChatOpened);

  const dispatch = useDispatch();

  const onIconMenuClick = () => {
    // This code for truthy values of showTopics and showAdvancedMenu
    if (
      showTopics &&
      (pathname === '/home/topics' || pathname === '/home/notification') &&
      isMobile
    ) {
      setShowMenu(true);
      setShowText(true);
      setShowTopics(false);
    } else if (
      !showTopics &&
      (pathname === '/home/topics' || pathname === '/home/notification') &&
      isMobile
    ) {
      setShowMenu(false);
      setShowText(false);
      setShowTopics(true);
    } else {
      setShowTopics(false);
    }

    // dispatch(setChatOpened(true));

    if (
      showAdvancedMenu &&
      (pathname.includes('settings') || pathname.includes('info')) &&
      isMobile
    ) {
      setShowMenu(true);
      setShowText(true);
      setShowAdvancedMenu(false);
    } else if (
      !showAdvancedMenu &&
      (pathname.includes('settings') || pathname.includes('info')) &&
      isMobile
    ) {
      setShowMenu(false);
      setShowText(false);
      setShowAdvancedMenu(true);
    } else {
      setShowAdvancedMenu(false);
    }

    // dispatch(setChatOpened(true));

    //
    // else if (
    // //   !showAdvancedMenu &&
    // //   (pathname.includes('settings') || pathname.includes('info')) &&
    // //   isTabletAndHigher
    // // ) {
    // //   setShowMenu(true);
    // //   setShowText(false);
    // //   setShowAdvancedMenu(true);
    // // } else if (
    // //   !showAdvancedMenu &&
    // //   (pathname.includes('settings') || pathname.includes('info')) &&
    // //   isDesktop
    // // ) {
    // //   setShowMenu(true);
    // //   setShowText(true);
    // //   setShowAdvancedMenu(true);
    // // } else {
    // //   setShowAdvancedMenu(false);
    // // }
    //

    // Handle the ChatOpened state
    if (showChat && pathname.includes('/chat/') && isMobile) {
      setShowMenu(true);
      setShowText(true);
      // dispatch(setChatOpened(false));
      setShowChat(false);
    } else if (!showChat && pathname.includes('/chat/') && isMobile) {
      setShowMenu(false);
      setShowText(false);
      // dispatch(setChatOpened(true));
      setShowChat(true);
    }

    // Render ChatComponent if SideBarComponent is not rendered.
    // In all other situations - show ChatComponent
    // if (!showMenu && path === 'chat') {
    //   dispatch(setChatOpened(false));
    // } else {
    //   dispatch(setChatOpened(true));
    // }

    // Show TopicsComponent only in mobile size of screen and if only SideBar doesn't
    // rendered. And render Topics only there this component must be rendered
    // if (
    //   !showMenu &&
    //   isMobile &&
    //   (pathname.includes('topics') || pathname.includes('notification'))
    // ) {
    //   setShowTopics(false);
    // } else {
    //   setShowTopics(true);
    // }

    // Hide ChatBlock component when SideBar rendered in mobile screen, and
    // Chat component is shown.
    // if (showMenu && isMobile && pathname.includes('chat')) {
    //   setShowTopics(false);
    // }

    // This is for displaying an advanced menus for mobile adaptive.
    // if (!showMenu && isMobile) {
    //   setShowAdvancedMenu(false);
    // } else {
    //   setShowAdvancedMenu(true);
    // }

    setShowMenu(!showMenu);
    // setShowTopics(false);
  };

  return (
    <header>
      <Wrapper>
        <HeaderWrap>
          <NavLink to={PATH.MAIN}>
            <Logo />
          </NavLink>
          {isLoggedIn && (
            <AuthSection>
              <HeaderUserInfo />
              <StyledIconButton
                icon={<CategoryIcon />}
                handleClick={onIconMenuClick}
              />
            </AuthSection>
          )}
        </HeaderWrap>
      </Wrapper>
    </header>
  );
};

export default Header;
