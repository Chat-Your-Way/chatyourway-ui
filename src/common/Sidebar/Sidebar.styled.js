import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { ICONS } from '../../ui-kit/icons';
import Button from '../../ui-kit/components/Button';

export const MainBox = styled(Box)`
  display: flex;
`;

export const StyledBox = styled(Box, {
  shouldForwardProp: (p) => p !== 'showText',
})`
  display: flex;
  flex-direction: column;
  width: 342px;
  gap: ${(p) => (p.showText ? '8px' : '24px')};
  box-sizing: border-box;
  background: ${(p) => p.theme.palette.primary.white};
  border: 1px solid transparent;
  border-radius: 16px;

  @media screen and (min-width: calc(834px - 0.02px)) {
    width: ${(p) => (p.showText ? '290px' : '75px')};
    background: transparent;
    border: none;
  }
`;

export const StyledContentBox = styled(Box, {
  shouldForwardProp: (p) => p !== 'showText',
})`
  padding-bottom: 83px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
  background: transparent;

  @media screen and (min-width: calc(834px - 0.02px)) {
    gap: 0;
  }
`;

export const Logo = styled(ICONS.LOGO)`
  padding-left: 67px;
  fill: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.contrastText
      : p.theme.palette.primary.dark};

  @media screen and (min-width: calc(834px - 0.02px)) {
    display: none;
  }
`;

export const StyledItemsBox = styled(Box, {
  shouldForwardProp: (p) => p !== 'showText',
})`
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
  background: transparent;
`;

export const StyledItem = styled(Box, {
  shouldForwardProp: (p) => p !== 'showText' && p !== 'isActive',
})`
  padding: ${(p) => (p.showText ? '16px' : '0')};
  cursor: ${(p) => (p.isActive ? 'default' : 'pointer')};
  display: flex;
  align-items: center;
  text-decoration: none;
  width: 235px;
  gap: ${(p) => (p.showText ? '8px' : '0')};
  box-sizing: border-box;
  color: ${(p) => p.theme.palette.primary.main};
  border-radius: 16px;
  background: transparent;
  border: none;
  transition: 0.2s ease all;

  .MuiTypography-root {
    ${(p) => p.theme.typography.h4}
  }

  @media screen and (min-width: calc(1200px - 0.02px)) {
    width: 290px;
  }

  @media screen and (min-width: calc(834px - 0.02px)) {
    border: 1px solid
      ${(p) =>
        p.showText && p.isActive
          ? p.theme.palette.primary.main
          : 'transparent'};

    background: ${(p) =>
      p.showText && p.isActive ? p.theme.palette.primary.white : 'transparent'};

    path {
      fill: ${(p) =>
        p.isActive
          ? p.theme.palette.primary.main
          : p.theme.palette.mode === 'light'
          ? undefined
          : p.theme.palette.primary.dark};
    }
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

  @media screen and (min-width: calc(834px - 0.02px)) {
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

  @media screen and (min-width: calc(834px - 0.02px)) {
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
