import { Typography } from '@mui/material';
import Toogle from '../../../ui-kit/components/Toogle';
// import Avater from '../../Avatar'
import {
  HeaderWrap,
  Logo,
  NotificationIcon,
  AuthSection,
  NotificationCount,
  UserName,
} from './Header.styled';
// import { useContext } from 'react';

const Header = () => {
  // const { toggleTheme } = useContext(ThemeContext);

  return (
    <header>
      <HeaderWrap>
        <Logo />
        <AuthSection>
          <Toogle />
          <NotificationCount badgeContent={3}>
            <Typography level="h6">
              <NotificationIcon />
            </Typography>
          </NotificationCount>
          <UserName variant="h4">Твоє ім`я</UserName>
          {/* <Avatar/> */}
        </AuthSection>
      </HeaderWrap>
    </header>
  );
};

export default Header;
