import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MainBox,
  StyledBox,
  StyledNavLink,
  StyledItem,
  StyledText,
  StyledItemsBox,
  StyledContentBox,
  Logo,
  LogOutButton,
  LogOutIcon,
} from './Sidebar.styled';
import { ICONS } from '../../ui-kit/icons';
import { useSidebarContext } from './SidebarContext';
import { PATH } from '../../constans/routes';
import { useMediaQuery } from 'react-responsive';
import { useUser } from '../../hooks/useUser';
import { useLogoutMutation } from '../../redux/auth-operations';
import { useTopicsContext } from '../Topics/TopicsContext';

const menuRoutes = [
  {
    path: PATH.TOPICS,
    name: 'Чати',
    icon: <ICONS.CHAT />,
  },
  {
    path: PATH.NOTIFICATION,
    name: 'Повідомлення',
    icon: <ICONS.MESSAGE />,
  },
  {
    path: PATH.SETTINGS,
    name: 'Налаштування',
    icon: <ICONS.SETTING />,
  },
  {
    path: PATH.INFO,
    name: 'FAQ',
    icon: <ICONS.INFO_SQUARE />,
  },
];

const useMobileMediaQuery = () =>
  useMediaQuery({ query: '(max-width: 769px)' });

const Sidebar = () => {
  const { showText, showMenu, setShowText, setShowMenu, setSelectedCategory } =
    useSidebarContext();
  const { pathname } = useLocation();
  const isMobile = useMobileMediaQuery();
  const [isShowText, setIsShowText] = useState();
  const { localLogOut } = useUser();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const { setShowTopics } = useTopicsContext();

  useEffect(() => {
    if (pathname === PATH.HOME) {
      setShowText(false);
      setShowMenu(true);
    } else {
      setShowText(true);
    }
    if (pathname.includes('chat')) {
      setShowText(false);
    } else {
      setShowText(true);
    }
  }, [pathname, setShowText, setShowMenu]);

  useEffect(() => {
    setIsShowText(showText);
  }, [showText]);

  useEffect(() => {
    if (!isMobile) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }, [isMobile, setShowMenu]);

  const LogOut = async () => {
    try {
      const { error } = await logout();

      if (error) {
        alert(error.data.message);
        return;
      }

      localLogOut();
      navigate(PATH.MAIN);
    } catch (error) {
      console.error('Виникла помилка:', error);
      return;
    }
  };

  const handleCategoryClick = (path) => {
    setSelectedCategory(path);
    if (isMobile) {
      setShowMenu(false);
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
            <StyledItemsBox>
              {menuRoutes.map((route) => {
                return (
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
                );
              })}
              <LogOutButton
                label="Вийти"
                startIcon={<LogOutIcon />}
                handleClick={LogOut}
              />
            </StyledItemsBox>
          </StyledContentBox>
        </StyledBox>
      )}
    </MainBox>
  );
};

export default Sidebar;
