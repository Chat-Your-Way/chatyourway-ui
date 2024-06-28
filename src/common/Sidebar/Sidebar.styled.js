import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { ICONS } from '../../ui-kit/icons';
import Button from '../../ui-kit/components/Button';

export const MainBox = styled(Box)`
  display: flex;
  padding-left: 0;

  @media screen and (min-width: 769px) {
    padding-left: 0;
  }

  @media screen and (min-width: 1200px) {
    padding-left: 55px;
  }
`;

export const StyledBox = styled(Box, {
  shouldForwardProp: (p) => p !== 'showText',
})`
  display: flex;
  flex-direction: column;

  gap: ${(p) => (p.showText === true ? '8px' : '24px')};
  box-sizing: border-box;
  background: ${(p) => p.theme.palette.primary.white};
  border: 1px solid transparent;
  border-radius: 16px;
  padding: 5px 5px;
  width: calc(100vw - 50px);

  @media screen and (max-width: 320px) {
    width: 300px;
  }

  @media screen and (max-width: 400px) {
    height: calc(100vh - 136px);
    margin-top: 20px;
    margin-left: 0;
  }

  @media screen and (min-width: 580px) {
    padding: 35px 15px 10px 15px;
    height: auto;
  }

  @media screen and (min-width: 769px) {
    width: ${(p) => (p.showText ? '290px' : '75px')};
    background: transparent;
    border: none;
    margin-left: 0;
  }
`;

export const StyledContentBox = styled(Box, {
  shouldForwardProp: (p) => p !== 'showText',
})`
  padding-bottom: 83px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  box-sizing: border-box;
  background: transparent;

  @media screen and (max-width: 320px) {
    gap: 10px;
  }

  @media screen and (min-width: 769px) {
    gap: 0;
    position: absolute;
    top: 167px;
    left: 40px;
  }

  @media screen and (min-width: 1200px) {
    top: 154px;
    left: 80px;
  }
`;

export const Logo = styled(ICONS.LOGO)`
  margin: 0 auto;
  fill: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.contrastText
      : p.theme.palette.primary.dark};

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

// export const StyledItemsBox = styled(Box, {
//   shouldForwardProp: p => p !== 'showText',
// })`
//   display: flex;
//   flex-direction: column;
//   gap: 9px;
//   box-sizing: border-box;
//   background: transparent;
// `;

export const StyledNavlist = styled('ul', {
  shouldForwardProp: (prop) => prop !== 'showText',
})`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 9px;
  box-sizing: border-box;
  background: transparent;
`;

export const StyledNavlistItem = styled('li', {
  shouldForwardProp: (p) => p !== 'showText' && p !== 'isActive',
})``;

export const StyledItem = styled(Box, {
  shouldForwardProp: (p) => p !== 'showText' && p !== 'isActive',
})`
  padding: ${(p) => (p.showText ? '16px' : '0')};
  cursor: ${(p) => (p.isActive ? 'default' : 'pointer')};
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: ${(p) => (p.showText ? '8px' : '0')};
  box-sizing: border-box;
  color: ${(p) => p.theme.palette.primary.main};
  border-radius: 16px;
  background: transparent;
  border: none;
  transition: 0.2s ease all;

  path {
    fill: ${(p) =>
      p.isActive
        ? p.theme.palette.primary.main
        : p.theme.palette.mode === 'light'
        ? undefined
        : p.theme.palette.primary.dark};
  }

  .MuiTypography-root {
    ${(p) => p.theme.typography.h4}
  }

  @media screen and (max-width: 320px) {
    padding: 8px 16px;
  }

  @media screen and (min-width: 769px) {
    max-width: 290px;
    border: 1px solid
      ${(p) =>
        p.showText && p.isActive
          ? p.theme.palette.primary.main
          : 'transparent'};

    background: ${(p) =>
      p.showText && p.isActive ? p.theme.palette.primary.white : 'transparent'};
  }

  @media screen and (min-width: 1200px) {
    width: 290px;
  }

  svg {
    width: ${(p) => (p.showText ? '35px' : '75px')};
    height: ${(p) => (p.showText ? '35px' : '75px')};
  }

  &:hover {
    border: 1px solid
      ${(p) => (p.showText ? p.theme.palette.primary.main : 'transparent')};
    color: ${(p) => p.theme.palette.primary.main};
    p {
      color: ${(p) => p.theme.palette.primary.main};
    }

    svg {
      filter: drop-shadow(-2px -2px 8px rgb(134 134 220 / 0.2))
        drop-shadow(2px 2px 8px rgb(134 134 220 / 0.2));
    }

    path {
      fill: ${(p) => (p.showText ? p.theme.palette.primary.main : undefined)};
    }
  }
`;

export const LogOutButton = styled(Button)`
  width: 235px;
  ${(p) => p.theme.typography.h4};
  background-color: transparent;
  color: ${(p) => p.theme.palette.primary.dark};
  display: flex;
  justify-content: start;

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

export const LogOutIcon = styled(ICONS.LOGOUT)`
  width: 35px;
  height: 35px;
  transform: rotate(180deg);
  fill: ${(p) => p.theme.palette.primary.dark};
`;

export const StyledText = styled(Typography, {
  shouldForwardProp: (p) => p !== 'isActive',
})`
  color: ${(p) => p.theme.palette.primary.dark};

  @media screen and (min-width: 769px) {
    color: ${(p) =>
      p.isActive ? p.theme.palette.primary.main : p.theme.palette.primary.dark};

    &:hover {
      color: ${(p) => p.theme.palette.primary.main};
    }

    &:active {
      color: ${(p) => p.theme.palette.primary.main};
    }
  }
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;
