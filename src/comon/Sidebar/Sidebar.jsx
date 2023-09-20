import {
  StyledBox,
  StyledNavLink,
  StyledItem,
  StyledText,
} from './Sidebar.styled';
import { ICONS } from '../../ui-kit/icons';
import { useSidebarContext } from './SidebarContext';

const Sidebar = () => {
  const { showText } = useSidebarContext();

  return (
    <StyledBox showText={showText}>
      <StyledNavLink to="/">
        {({ isActive }) => (
          <StyledItem showText={showText} isActive={isActive}>
            <ICONS.CHAT />
            <StyledText isActive={isActive}>Чати</StyledText>
          </StyledItem>
        )}
      </StyledNavLink>
      <StyledNavLink to="/notification">
        {({ isActive }) => (
          <StyledItem showText={showText} isActive={isActive}>
            <ICONS.MESSAGE />
            <StyledText isActive={isActive}>Повідомлення</StyledText>
          </StyledItem>
        )}
      </StyledNavLink>
      <StyledNavLink to="/settings">
        {({ isActive }) => (
          <StyledItem showText={showText} isActive={isActive}>
            <ICONS.SETTING />
            <StyledText isActive={isActive}>Налаштування</StyledText>
          </StyledItem>
        )}
      </StyledNavLink>
      <StyledNavLink to="/info">
        {({ isActive }) => (
          <StyledItem showText={showText} isActive={isActive}>
            <ICONS.INFO_SQUARE />
            <StyledText isActive={isActive}>FAQ</StyledText>
          </StyledItem>
        )}
      </StyledNavLink>
    </StyledBox>
  );
};

export default Sidebar;
