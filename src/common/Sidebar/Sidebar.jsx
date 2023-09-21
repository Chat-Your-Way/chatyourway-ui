import {
  StyledBox,
  StyledNavLink,
  StyledItem,
  StyledText,
} from './Sidebar.styled';
import { ICONS } from '../../ui-kit/icons';
import { useSidebarContext } from './SidebarContext';
import { PATH } from '../../constans/routes';

const Sidebar = () => {
  const { showText } = useSidebarContext();

  const menuRoutes = [
    {
      path: PATH.main,
      name: 'Чати',
      icon: 'CHAT',
    },
    {
      path: PATH.notification,
      name: 'Повідомлення',
      icon: 'MESSAGE',
    },
    {
      path: PATH.settings,
      name: 'Налаштування',
      icon: 'SETTING',
    },
    {
      path: PATH.info,
      name: 'FAQ',
      icon: 'INFO_SQUARE',
    },
  ];

  return (
    <StyledBox showText={showText}>
      {menuRoutes.map((route) => {
        const IconComponent = ICONS[route.icon];
        return (
          <StyledNavLink to={route.path} key={route.name}>
            {({ isActive }) => (
              <StyledItem showText={showText} isActive={isActive}>
                <IconComponent />
                {showText && (
                  <StyledText isActive={isActive}>{route.name}</StyledText>
                )}
              </StyledItem>
            )}
          </StyledNavLink>
        );
      })}
    </StyledBox>
  );
};

export default Sidebar;
