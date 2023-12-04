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

const useTabletAndBelowMediaQuery = () =>
  useMediaQuery({ query: '(max-width: 1200px)' });

const useMobileMediaQuery = () =>
  useMediaQuery({ query: '(max-width: 834px)' });

const Sidebar = () => {
  const { showText, showMenu, setShowText, setShowMenu } = useSidebarContext();
  const { pathname } = useLocation();
  const isTabletAndBelow = useTabletAndBelowMediaQuery();
  const isMobile = useMobileMediaQuery();
  const [isShowText, setIsShowText] = useState();
  const { localLogOut } = useUser();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const isHome = pathname.includes('home');
    const isTopicsOrNotification = pathname.includes('topics')
      ? true
      : pathname.includes('notification')
      ? true
      : false;
    if (pathname.includes('chat')) setShowText(false);
    else setShowText(true);
    if (isMobile && isTopicsOrNotification) setShowMenu(false);
    else if (isMobile && isHome) setShowMenu(true);
  }, [pathname, setShowText, setShowMenu, isTabletAndBelow, isMobile]);

  useEffect(() => {
    setIsShowText(showText);
  }, [showText]);

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
                      <StyledItem showText={showText} isActive={isActive}>
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
