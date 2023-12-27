import styled from '@emotion/styled';
import { ICONS } from '../../../ui-kit/icons';
import { Box } from '@mui/material';
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
