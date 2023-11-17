import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { ICONS } from '../../ui-kit/icons';

export const RecoveryPasswordWrapper = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LinkIcon = styled(Link)`
  display: none;
  @media screen and (min-width: calc(1200px - 0.02px)) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 24px;
    top: 24px;
  }
`;

export const CloseIcon = styled(ICONS.CLOSE_SQUARE)`
  stroke: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.dark
      : p.theme.palette.primary.contrastText};
  transition: all 250ms ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

export const LogoIcon = styled(ICONS.LOGO)`
  margin: 0 0 24px 0;
  fill: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.contrastText
      : p.theme.palette.primary.dark};
  @media screen and (min-width: calc(845px - 0.02px)) {
    display: none;
  }
`;

export const RecoveryPasswordTitle = styled(Typography)`
  margin: 0 0 24px 0;
  color: ${(p) => p.theme.palette.primary.dark};
`;

export const RecoveryPasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonWrapper = styled(Box)`
  margin: 24px 0 0 0;
  text-align: center;
`;
