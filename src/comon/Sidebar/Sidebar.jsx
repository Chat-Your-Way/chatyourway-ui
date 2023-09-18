import { memo } from 'react';
import {
  StyledBox,
  ActiveLink,
  ActiveText,
  DefaultLink,
  DefaultText,
} from './Sidebar.styled';
import { ICONS } from '../../ui-kit/icons';
import { useSidebarContext } from './SidebarContext';

const Sidebar = () => {
  const curPath = 'main'; // the path will be obtained from routing

  const { showText } = useSidebarContext();

  return (
    <StyledBox showText={showText}>
      {curPath === 'main' ? (
        <ActiveLink showText={showText}>
          <ICONS.CHAT />
          {showText && <ActiveText>Chats</ActiveText>}
        </ActiveLink>
      ) : (
        <DefaultLink showText={showText}>
          <ICONS.CHAT />
          {showText && <DefaultText>Chats</DefaultText>}
        </DefaultLink>
      )}
      {curPath === 'notification' ? (
        <ActiveLink showText={showText}>
          <ICONS.MESSAGE />
          {showText && <ActiveText>MESSAGE</ActiveText>}
        </ActiveLink>
      ) : (
        <DefaultLink showText={showText}>
          <ICONS.MESSAGE />
          {showText && <DefaultText>Notification</DefaultText>}
        </DefaultLink>
      )}
      {curPath === 'settings' ? (
        <ActiveLink showText={showText}>
          <ICONS.SETTING />
          {showText && <ActiveText>Settings</ActiveText>}
        </ActiveLink>
      ) : (
        <DefaultLink showText={showText}>
          <ICONS.SETTING />
          {showText && <DefaultText>Settings</DefaultText>}
        </DefaultLink>
      )}
      {curPath === 'info' ? (
        <ActiveLink showText={showText}>
          <ICONS.INFO_SQUARE />
          {showText && <ActiveText>FAQ</ActiveText>}
        </ActiveLink>
      ) : (
        <DefaultLink showText={showText}>
          <ICONS.INFO_SQUARE />
          {showText && <DefaultText>FAQ</DefaultText>}
        </DefaultLink>
      )}
    </StyledBox>
  );
};

export default memo(Sidebar);
