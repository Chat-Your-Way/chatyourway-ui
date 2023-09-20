import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const StyledBox = styled(Box, {
  shouldForwardProp: (p) => p !== 'showText',
})`
  display: flex;
  flex-direction: column;
  gap: ${(p) => (p.showText ? '8px' : '24px')};
  box-sizing: border-box;
`;

export const StyledItem = styled(Box, {
  shouldForwardProp: (p) => p !== 'showText',
})`
  ${(p) => p.theme.typography.h5}
  padding: 16px;
  cursor: ${(p) => (p.isActive ? 'default' : 'pointer')};
  width: ${(p) => (p.showText ? '290px' : '75px')};
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: ${(p) => (p.showText ? '8px' : '0')};
  box-sizing: border-box;
  border-radius: 16px;
  border: 1px solid
    ${(p) =>
      p.showText && p.isActive ? p.theme.palette.primary.main : 'transparent'};
  color: ${(p) => p.theme.palette.primary.main};
  background: ${(p) =>
    p.showText && p.isActive ? p.theme.palette.primary.white : 'transparent'};
  transition: 0.2s ease all;

  svg {
    width: ${(p) => (p.showText ? '35px' : '75px')};
    height: ${(p) => (p.showText ? '35px' : '75px')};
  }

  path {
    fill: ${(p) => (p.isActive ? p.theme.palette.primary.main : undefined)};
  }

  &:hover {
    border: 1px solid
      ${(p) => (p.showText ? p.theme.palette.primary.main : 'transparent')};

    color: ${(p) => p.theme.palette.primary.main};

    svg {
      filter: drop-shadow(-2px -2px 8px rgb(134 134 220 / 0.2))
        drop-shadow(2px 2px 8px rgb(134 134 220 / 0.2));
    }

    path {
      fill: ${(p) => (p.showText ? p.theme.palette.primary.main : undefined)};
    }
  }
`;

export const StyledText = styled(Box)`
  color: ${(p) =>
    p.isActive ? p.theme.palette.primary.main : p.theme.palette.primary.dark};

  &:hover {
    color: ${(p) =>
      p.isActive ? 'transparent' : p.theme.palette.primary.main};
  }
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;
