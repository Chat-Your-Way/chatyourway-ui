import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import DefaultButton from '../../ui-kit/components/Button';
import { ICONS } from '../../ui-kit/icons';

export const SuccessSignupWrapper = styled(Box)`
  gap: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 844px) {
    width: 457px;
  }
`;

export const Logo = styled(ICONS.LOGO)`
  display: block;
  justify-content: center;
  padding: 58px 0;
  fill: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.contrastText
      : p.theme.palette.primary.dark};

  @media screen and (min-width: calc(845px - 0.02px)) {
    display: none;
  }
`;

export const SuccessSignupTitle = styled(Typography)`
  text-align: center;
  color: ${(p) => p.theme.palette.primary.dark};
  ${(p) => p.theme.typography.h3}
  min-width: 300px;
  @media screen and (min-width: calc(845px - 0.02px)) {
    min-width: 486px;
  }
`;

export const LoginAccountButton = styled(DefaultButton)`
  ${(p) => p.theme.typography.h5}
  padding: 8px 12px;
  width: 180px;
  margin-top: 24px;
  justify-content: center;
  align-items: center;
  display: flex;
  @media screen and (min-width: calc(845px - 0.02px)) {
    display: flex;
    ${(p) => p.theme.typography.h5}
  }
`;
