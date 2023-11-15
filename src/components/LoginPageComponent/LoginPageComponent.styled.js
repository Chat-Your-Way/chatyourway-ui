import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { ICONS } from '../../ui-kit/icons';
import DefaultButton from '../../ui-kit/components/Button';

export const LoginWrapper = styled(Box)`
  height: 600px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: calc(845px - 0.02px)) {
    height: 800px;
  }
  @media screen and (min-width: calc(1200px - 0.02px)) {
    height: 600px;
  }
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

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoginLink = styled(Link)`
  text-decoration: none;
  font-size: 14px;
  color: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.contrastText
      : p.theme.palette.primary.main};
`;

export const ButtonWrapper = styled(Box)`
  margin: 24px 0 0 0;
  text-align: center;
`;

export const LoginButton = styled(DefaultButton)`
  height: 40px;
  padding: 8px 12px;
  width: 180px;
`;
