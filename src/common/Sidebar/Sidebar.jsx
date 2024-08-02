import { useState, useEffect } from 'react';
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
import { useMediaQuery } from 'react-responsive';
// import { useUser } from '../../hooks/useUser';
import { useLogoutMutation } from '../../redux/auth-operations';
import { useTopicsContext } from '../Topics/TopicsContext';
import { useDispatch, useSelector } from 'react-redux';

import { selectChatOpened, setChatOpened } from '../../redux/chatSlice';
import localLogOutUtil from '../../utils/localLogOutUtil';

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

const useMobileMediaQuery = () =>
  useMediaQuery({ query: '(max-width: 767px)' });

const Sidebar = () => {
  const { showText, showMenu, setShowText, setShowMenu, setSelectedCategory } =
    useSidebarContext();
  const { pathname } = useLocation();
  const isMobile = useMobileMediaQuery();

  const [isShowText, setIsShowText] = useState();
  // const { localLogOut } = useUser();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const { setShowTopics } = useTopicsContext();
  const dispatch = useDispatch();
  const isChatOpened = useSelector(selectChatOpened);

  useEffect(() => {
    // if (pathname === PATH.HOME) {
    //   setShowText(false);
    //   setShowMenu(true);
    // } else {
    //   setShowText(true);
    // }
    // if (pathname.includes('chat')) {
    //   setShowText(false);
    // } else {
    //   setShowText(true);
    // }
    if (isChatOpened && pathname.includes('chat')) {
      setShowText(false);
    } else {
      setShowText(true);
    }
  }, [pathname, setShowText, setShowMenu, isChatOpened]);

  useEffect(() => {
    setIsShowText(showText);
  }, [showText]);

  useEffect(() => {
    if (!isMobile) {
      setShowMenu(true);
    } else {
      setShowMenu(true); // Mobile menu always true?
    }
  }, [isMobile, setShowMenu]);

  const LogOut = async () => {
    try {
      const { error } = await logout();

      if (error) {
        alert(error.data.message);
        // dispatch(setIsLoggedIn(false));
        localLogOutUtil();
        return;
      }

      // localLogOut();
      // navigate(PATH.MAIN);
      // dispatch(setIsLoggedIn(false));
      localLogOutUtil();
    } catch (error) {
      console.error('Виникла помилка:', error);
      return;
    }
  };

  const handleCategoryClick = (path) => {
    setSelectedCategory(path);
    if (isMobile) {
      setShowMenu(false);
      dispatch(setChatOpened(true));
    }

    setShowTopics(true);
    navigate(path);
  };

  return (
    <MainBox>
      {showMenu && (
        <StyledBox showText={isShowText}>
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
              <LogOutButton
                label="Вийти"
                startIcon={<LogOutIcon />}
                handleClick={LogOut}
              />
            </StyledNavlist>
            {/* </StyledItemsBox> */}
          </StyledContentBox>
        </StyledBox>
      )}
    </MainBox>
  );
};

export default Sidebar;
