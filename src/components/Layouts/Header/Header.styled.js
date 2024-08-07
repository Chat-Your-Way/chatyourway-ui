import styled from '@emotion/styled';
import { ICONS } from '../../../ui-kit/icons';
import { Box } from '@mui/material';
import IconButton from '../../../ui-kit/components/IconButton';

export const HeaderWrap = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 24px;
  /* padding-top: 10px;
  padding-left: 25px;
  padding-right: 18px; */
  box-sizing: border-box;

  /* @media screen and (min-width: 560px) {
    padding-top: 30px;
  } */
  @media screen and (min-width: 768px) {
    padding: 40px;
  }
  @media screen and (min-width: 1200px) {
    padding: 30px 80px;
  }
`;

export const Logo = styled(ICONS.LOGO)`
  display: none;

  @media screen and (min-width: 768px) {
    display: block;
    fill: ${(p) =>
      p.theme.palette.mode === 'light'
        ? p.theme.palette.primary.contrastText
        : p.theme.palette.primary.dark};
  }

  @media screen and (min-width: 1200px) {
    padding-left: 0;
  }
`;

export const AuthSection = styled(Box)`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 767px) {
    flex-grow: 1;
  }
`;

export const StyledIconButton = styled(IconButton)`
  display: block;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const CategoryIcon = styled(ICONS.CATEGORY)`
  height: 24px;
  width: 24px;
  fill: ${(p) => p.theme.palette.primary.dark};
`;
