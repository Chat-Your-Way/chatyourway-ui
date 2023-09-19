import { Typography } from '@mui/material';
import Toogle from '../../../ui-kit/components/Toogle';
import Avatar from '../../../ui-kit/components/Avatar';
import {
  HeaderWrap,
  Logo,
  NotificationIcon,
  AuthSection,
  NotificationCount,
  UserName,
} from './Header.styled';
import { useContext } from 'react';
import { ThemeContext } from '../../../ui-kit/theme/ThemeProvider';

const Header = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <header>
      <HeaderWrap>
        <Logo />
        <AuthSection>
          <Toogle handleChange={toggleTheme} />
          <NotificationCount badgeContent={3}>
            <Typography level="h6">
              <NotificationIcon />
            </Typography>
          </NotificationCount>
          <UserName variant="h4">Твоє ім`я</UserName>
          <Avatar />
        </AuthSection>
      </HeaderWrap>
    </header>
  );
};

export default Header;
