import styled from '@emotion/styled';
import { ICONS } from '../../ui-kit/icons';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import TextNavLinkButton from '../../ui-kit/components/TextNavLinkButton';

export const LinkIcon = styled(Link)`
  display: none;
  @media screen and (min-width: calc(845px - 0.02px)) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 24px;
    top: 24px;
  }
`;

export const CloseIcon = styled(ICONS.CLOSE_SQUARE)`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;

  & > path,
  & > circle {
    transition: all 0.2s ease;
  }

  path {
    fill: ${(p) =>
      p.theme.palette.mode === 'light'
        ? p.theme.palette.primary.dark
        : p.theme.palette.primary.main};
  }

  circle {
    stroke: ${(p) =>
      p.theme.palette.mode === 'light'
        ? p.theme.palette.primary.dark
        : p.theme.palette.primary.main};
  }

  &:hover {
    path {
      fill: ${(p) => p.theme.palette.primary.light};
    }

    circle {
      stroke: ${(p) => p.theme.palette.primary.light};
    }
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
  color: ${(p) => p.theme.palette.primary.dark};
`;

export const ForgotPasswordText = styled(Typography)`
  margin: 0 0 24px 0;
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

export const ForgotPasswordButton = styled(TextNavLinkButton)`
  display: flex;
  width: 180px;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
