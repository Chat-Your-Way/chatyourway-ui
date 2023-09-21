import {
  StyledBox,
  StyledNavLink,
  StyledItem,
  StyledText,
} from './Sidebar.styled';
import { ICONS } from '../../ui-kit/icons';
import { useSidebarContext } from './SidebarContext';
import { routes } from '../../constans/routes';

const Sidebar = () => {
  const { showText } = useSidebarContext();

  const setIcon = (name) => {
    switch (name) {
      case 'CHAT':
        return <ICONS.CHAT />;
      case 'MESSAGE':
        return <ICONS.MESSAGE />;
      case 'SETTING':
        return <ICONS.SETTING />;
      case 'INFO_SQUARE':
        return <ICONS.INFO_SQUARE />;
      default:
        break;
    }
  };

  return (
    <StyledBox showText={showText}>
      {Object.values(routes).map((route) => (
        <StyledNavLink to={route.path} key={route.name}>
          {({ isActive }) => (
            <StyledItem showText={showText} isActive={isActive}>
              {setIcon(route.icon)}
              <StyledText isActive={isActive}>{route.name}</StyledText>
            </StyledItem>
          )}
        </StyledNavLink>
      ))}
    </StyledBox>
  );
};

export default Sidebar;
