import {
  StyledBox,
  StyledNavLink,
  StyledItem,
  StyledText,
} from './Sidebar.styled';
import { ICONS } from '../../ui-kit/icons';
import { useSidebarContext } from './SidebarContext';
import { PATH } from '../../constans/routes';

const menuRoutes = [
  {
    path: PATH.MAIN,
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
  const { showText } = useSidebarContext();

  return (
    <StyledBox showText={showText}>
      {menuRoutes.map((route) => {
        return (
          <StyledNavLink to={route.path} key={route.name}>
            {({ isActive }) => (
              <StyledItem showText={showText} isActive={isActive}>
                {route.icon}
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
