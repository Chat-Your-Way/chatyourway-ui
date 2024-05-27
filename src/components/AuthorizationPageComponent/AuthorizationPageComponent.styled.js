import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import TextNavLinkButton from '../../ui-kit/components/TextNavLinkButton';
import { ICONS } from '../../ui-kit/icons';

export const AuthorizationWrapper = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const AuthorizationLogo = styled(ICONS.LOGO)`
  fill: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.contrastText
      : p.theme.palette.primary.dark};
  margin-bottom: 92px;
  @media screen and (min-width: 769px) {
    display: none;
  }
`;

export const AuthorizationTitle = styled(Typography)`
  ${(p) => p.theme.typography.h3}
  text-align: center;
  color: ${(p) => p.theme.palette.primary.dark};
  margin-bottom: 24px;
  @media screen and (min-width: 769px) {
    ${(p) => p.theme.typography.h2}
    margin-bottom: 40px;
  }
`;

export const ButtonWrapper = styled(Box)`
  gap: 16px;
  display: flex;
  flex-direction: column;
  width: 180px;
`;

export const AuthorizationButton = styled(TextNavLinkButton)`
  text-align: center;
`;
