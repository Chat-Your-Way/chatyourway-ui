import styled from '@emotion/styled';
import { ICONS } from '../../../icons';
import { Typography } from '@mui/material';
import Toogle from '../../Toogle';

export const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled(ICONS.LOGO)`
  fill: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.contrastText
      : p.theme.palette.primary.white};
`;

export const HeaderToogle = styled(Toogle)``;

export const NotificationWrap = styled.div`
  position: relative;
  margin: 0 24px 0 8px;
`;

export const NotificationIcon = styled(ICONS.NOTIFICATION)`
  height: 40px;
  width: 40px;
  fill: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.main
      : p.theme.palette.primary.light};
`;

export const NotificationCount = styled.div`
  background-color: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.disabled
      : p.theme.palette.primary.dark};
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -20px;
  right: -15px;
  & > h6 {
    color: ${(p) =>
      p.theme.palette.mode === 'light'
        ? p.theme.palette.primary.dark
        : p.theme.palette.primary.disabled};
  }
`;

export const UserName = styled(Typography)`
  color: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.dark
      : p.theme.palette.primary.disabled};
`;

export const AuthSection = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledSpan = styled.span`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #fefe;
  margin-left: 8px;
  border: 1px solid #353535;
`;
