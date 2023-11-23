import styled from '@emotion/styled';
import { ICONS } from '../../../ui-kit/icons';
import { Badge, Box, Typography } from '@mui/material';
import Toogle from '../../../ui-kit/components/Toogle';
import IconButton from '../../../ui-kit/components/IconButton';

export const HeaderWrap = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
  @media screen and (min-width: calc(845px - 0.02px)) {
    padding-top: 40px;
    padding-bottom: 45px;
  }
  @media screen and (min-width: calc(1195px - 0.02px)) {
    padding-top: 30px;
    padding-bottom: 40px;
  }
`;

export const Logo = styled(ICONS.LOGO)`
  display: none;

  @media screen and (min-width: calc(845px - 0.02px)) {
    display: block;
    fill: ${(p) =>
      p.theme.palette.mode === 'light'
        ? p.theme.palette.primary.contrastText
        : p.theme.palette.primary.dark};
  }
`;

export const AuthSection = styled(Box)`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: calc(845px - 0.02px)) {
    flex-grow: 1;
  }
`;

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
  margin: 0 10px 0 0;
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

export const StyledIconButton = styled(IconButton)`
  display: block;

  @media screen and (min-width: calc(845px - 0.02px)) {
    display: none;
  }
`;

export const CategoryIcon = styled(ICONS.CATEGORY)`
  height: 24px;
  width: 24px;
  fill: ${(p) => p.theme.palette.primary.dark};
`;
