import { Typography } from '@mui/material';
import Avatar from '../../../ui-kit/components/Avatar';
import {
  HeaderWrap,
  Logo,
  NotificationIcon,
  AuthSection,
  NotificationCount,
  UserName,
  StyledToogle,
  CategoryIcon,
  StyledIconButton,
} from './Header.styled';
import { useContext } from 'react';
import { ThemeContext } from '../../../ui-kit/theme/ThemeProvider';

const Header = () => {
  const { toggleTheme, currentTheme } = useContext(ThemeContext);

  return (
    <header>
      <HeaderWrap>
        <Logo />
        <AuthSection>
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
        </AuthSection>
        <StyledIconButton icon={<CategoryIcon />} />
      </HeaderWrap>
    </header>
  );
};

export default Header;
