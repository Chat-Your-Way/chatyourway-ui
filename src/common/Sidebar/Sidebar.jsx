import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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

const Sidebar = () => {
  const { showText, showMenu, setShowMenu } = useSidebarContext();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes('chat')) setShowMenu(false);
    else setShowMenu(true);
  }, [pathname, setShowMenu]);

  return (
    <MainBox>
      {showMenu && (
        <StyledBox showText={showText}>
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
              <LogOutButton label="Вийти" startIcon={<LogOutIcon />} />
            </StyledItemsBox>
          </StyledContentBox>
        </StyledBox>
      )}
    </MainBox>
  );
};

export default Sidebar;
