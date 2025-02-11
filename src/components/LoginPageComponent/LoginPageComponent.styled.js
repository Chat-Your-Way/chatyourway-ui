import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { ICONS } from '../../ui-kit/icons';
import DefaultButton from '../../ui-kit/components/Button';

export const LoginWrapper = styled(Box)`
  display: flex;
  margin-top: 115px;
  height: 600px;
  /* margin: 0 auto; */
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* position: absolute;
  top: 41%;
  transform: translateY(-50%); */

  @media screen and (min-width: 768px) {
    padding-bottom: 0;
    padding-top: 0;
    top: 50%;
  }

  @media screen and (min-width: 1200px) {
    margin-top: 0;
    padding-bottom: 30px;
    padding-top: 30px;
  }

  h5 {
    font-size: ${(p) => p.theme.typography.h5};
    margin-top: 0;
  }

  span {
    font-size: ${(p) => p.theme.typography.h5};
  }

  .css-1tqzluo-MuiInputBase-root {
    height: 46px;
  }
`;

export const LogoIcon = styled(ICONS.LOGO)`
  margin: 0 0 67px 0;
  fill: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.contrastText
      : p.theme.palette.primary.dark};
  @media screen and (min-width: 769px) {
    display: none;
  }
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoginLink = styled(NavLink)`
  text-decoration: none;
  font-size: ${(p) => p.theme.typography.h6};
  color: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.contrastText
      : p.theme.palette.primary.main};
  &:hover {
    text-decoration: underline;
  }
`;
export const RegistrationLink = styled(NavLink)`
  text-decoration: none;
  margin-top: 20px;
  font-size: ${(p) => p.theme.typography.h6};
  color: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.contrastText
      : p.theme.palette.primary.main};
  &:hover {
    text-decoration: underline;
  }
`;

export const ButtonWrapper = styled(Box)`
  margin: 20px 0 0 0;
  text-align: center;
`;

export const LoginButton = styled(DefaultButton)`
  height: 40px;
  padding: 8px 12px;
  width: 180px;
`;
