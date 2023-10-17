import {
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
  const { showText, showMenu } = useSidebarContext();

  return (
    <>
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
    </>
  );
};

export default Sidebar;
