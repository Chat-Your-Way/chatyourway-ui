import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { ICONS } from '../../ui-kit/icons';
import DefaultButton from '../../ui-kit/components/Button';

export const LoginWrapper = styled(Box)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

export const LogoIcon = styled(ICONS.LOGO)`
  margin: 0 0 67px 0;
  fill: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.contrastText
      : p.theme.palette.primary.dark};
  @media screen and (min-width: calc(845px - 0.02px)) {
    display: none;
  }
`;

export const InputWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

export const LoginButton = styled(DefaultButton)`
  height: 40px;
  padding: 8px 12px;
  width: 180px;
`;
