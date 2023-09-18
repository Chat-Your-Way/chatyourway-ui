import { Typography } from '@mui/material';
import {
  HeaderWrap,
  Logo,
  NotificationCount,
  NotificationIcon,
  NotificationWrap,
  AuthSection,
  StyledSpan,
  UserName,
  HeaderToogle,
} from './Header.styled';

const Header = () => {
  return (
    <>
      <header>
        <HeaderWrap>
          <Logo />
          <AuthSection>
            <HeaderToogle />
            <NotificationWrap>
              <NotificationIcon />
              <NotificationCount>
                <Typography variant="h6">3</Typography>
              </NotificationCount>
            </NotificationWrap>
            <UserName variant="h4">Твоє ім`я</UserName>
            <StyledSpan></StyledSpan>
          </AuthSection>
        </HeaderWrap>
      </header>
    </>
  );
};

export default Header;
