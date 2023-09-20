import styled from '@emotion/styled';
import { ICONS } from '../../../ui-kit/icons';
import { Badge, Box, Typography } from '@mui/material';

export const HeaderWrap = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 40px;
`;

export const Logo = styled(ICONS.LOGO)`
  fill: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.contrastText
      : p.theme.palette.primary.dark};
`;

export const NotificationIcon = styled(ICONS.NOTIFICATION)`
  height: 40px;
  width: 40px;
  fill: ${(p) => p.theme.palette.primary.main};
`;

export const NotificationCount = styled(Badge)`
  margin: 0 24px 0 8px;
  color: ${(p) => p.theme.palette.primary.dark};
  .MuiBadge-badge {
    background-color: ${(p) => p.theme.palette.primary.disabled};
  }
`;

export const UserName = styled(Typography)`
  color: ${(p) => p.theme.palette.primary.dark};
  margin-right: 8px;
`;

export const AuthSection = styled(Box)`
  display: flex;
  align-items: center;
`;
