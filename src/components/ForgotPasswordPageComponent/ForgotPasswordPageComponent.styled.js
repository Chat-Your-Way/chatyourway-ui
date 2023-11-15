import styled from '@emotion/styled';
import { ICONS } from '../../ui-kit/icons';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

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
  transition: all 250ms ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

export const ForgotPasswordWrapper = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: calc(845px - 0.02px)) {
    max-width: 400px;
  }
`;

export const LogoIcon = styled(ICONS.LOGO)`
  margin: 0 auto 40px auto;
  fill: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.contrastText
      : p.theme.palette.primary.dark};
  @media screen and (min-width: calc(845px - 0.02px)) {
    display: none;
  }
`;

export const ForgotPasswordTitle = styled(Typography)`
  text-align: start;
  font-size: ${(p) => p.theme.typography.h4};
  color: ${(p) => p.theme.palette.primary.dark};
  @media screen and (min-width: calc(845px - 0.02px)) {
    font-size: ${(p) => p.theme.typography.h2};
  }
`;

export const ForgotPasswordText = styled(Typography)`
  margin: 0 0 24px 0;
  font-size: ${(p) => p.theme.typography.h6};
  color: ${(p) => p.theme.palette.primary.dark};
  opacity: 0.6;
`;

export const ForgotPasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonWrapper = styled(Box)`
  margin: 24px 0 0 0;
  text-align: center;
`;
