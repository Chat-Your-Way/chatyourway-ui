import { Badge, Box, Typography, styled } from '@mui/material';
import Toogle from '../../../../ui-kit/components/Toogle';
import { ICONS } from '../../../../ui-kit/icons';

export const UserInfoBlock = styled(Box)`
  display: flex;
  align-items: center;
`;

export const StyledToogle = styled(Toogle)`
  display: none;

  @media screen and (min-width: calc(845px - 0.02px)) {
    display: flex;
  }
`;

export const NotificationIcon = styled(ICONS.NOTIFICATION)`
  height: 24px;
  width: 24px;
  padding-top: 8px;
  padding-right: 2px;
  @media screen and (min-width: calc(845px - 0.02px)) {
    height: 40px;
    width: 40px;
    padding: 0;
  }
  fill: ${(p) => p.theme.palette.primary.main};
`;

export const NotificationCount = styled(Badge)`
  @media screen and (max-width: calc(845px - 0.03px)) {
    margin: 0 10px 0 11px;
  }

  @media screen and (min-width: calc(845px - 0.02px)) {
    margin: 0 24px 0 8px;
  }

  color: ${(p) => p.theme.palette.primary.dark};
  .MuiBadge-badge {
    background-color: ${(p) => p.theme.palette.primary.disabled};
  }
`;

export const UserName = styled(Typography)`
  @media screen and (max-width: calc(845px - 0.02px)) {
    font-size: 16px;
  }
  color: ${(p) => p.theme.palette.primary.dark};
  margin-right: 8px;
`;
