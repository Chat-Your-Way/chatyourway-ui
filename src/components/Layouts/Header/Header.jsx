import { Typography, Link } from '@mui/material';
import Avatar from '../../../ui-kit/components/Avatar';
import {
  HeaderWrap,
  Logo,
  NotificationIcon,
  NotificationCount,
  UserName,
  StyledToogle,
  CategoryIcon,
  StyledIconButton,
  AuthSection,
  UserInfoBlock,
} from './Header.styled';
import { useContext } from 'react';
import { ThemeContext } from '../../../ui-kit/theme/ThemeProvider';
import { useSidebarContext } from '../../../common/Sidebar/SidebarContext';
import Wrapper from '../Wrapper';
import { useUser } from '../../../hooks/useUser';
import { PATH } from '../../../constans/routes';

const Header = () => {
  const { toggleTheme, currentTheme } = useContext(ThemeContext);
  const { showMenu, setShowMenu } = useSidebarContext();
  const { isAuthenticated } = useUser();

  const onIconMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header>
      <Wrapper>
        <HeaderWrap>
          <Link href={PATH.MAIN}>
            <Logo />
          </Link>
          {isAuthenticated && (
            <AuthSection>
              <UserInfoBlock>
                <StyledToogle
                  handleChange={toggleTheme}
                  isChecked={currentTheme === 'dark'}
                />
                <NotificationCount badgeContent={3}>
                  <Typography level="h6">
                    <NotificationIcon />
                  </Typography>
                </NotificationCount>
                <UserName variant="h4">Твоє ім`я</UserName>
                <Avatar />
              </UserInfoBlock>
              <StyledIconButton
                icon={<CategoryIcon />}
                handleClick={onIconMenuClick}
              />
            </AuthSection>
          )}
        </HeaderWrap>
      </Wrapper>
    </header>
  );
};

export default Header;
