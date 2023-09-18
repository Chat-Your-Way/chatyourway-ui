import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import styled from '@emotion/styled';

export const StyledBox = styled(Box, {
  shouldForwardProp: (p) => p !== 'showText',
})`
  display: flex;
  flex-direction: column;
  gap: ${(p) => (p.showText ? '8px' : '24px')};
  box-sizing: border-box;
`;

export const ActiveLink = styled(Link, {
  shouldForwardProp: (p) => p !== 'showText',
})`
  padding: 16px;
  width: 290px;
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 8px;
  box-sizing: border-box;
  font-size: ${(p) => p.theme.typography.h5.fontSize};
  border-radius: 16px;
  border: 1px solid
    ${(p) => (p.showText ? p.theme.palette.primary.main : 'transparent')};
  color: ${(p) => p.theme.palette.primary.main};
  background: ${(p) => p.theme.palette.primary.white};
  transition: 0.2s ease all;

  svg {
    width: ${(p) => (p.showText ? '35px' : '75px')};
    height: ${(p) => (p.showText ? '35px' : '75px')};
  }

  path {
    fill: ${(p) => p.theme.palette.primary.main};
  }
`;

export const DefaultLink = styled(Link, {
  shouldForwardProp: (p) => p !== 'showText',
})`
  padding: 16px;
  width: 290px;
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 8px;
  box-sizing: border-box;
  font-size: ${(p) => p.theme.typography.h5.fontSize};
  border-radius: 16px;
  border: 1px solid transparent;
  color: ${(p) => p.theme.palette.primary.dark};
  background: transparent;
  cursor: pointer;
  transition: 0.2s ease all;

  svg {
    width: ${(p) => (p.showText ? '35px' : '75px')};
    height: ${(p) => (p.showText ? '35px' : '75px')};
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
      fill: ${(p) => (p.showText ? p.theme.palette.primary.main : '')};
    }
  }
`;

export const DefaultText = styled(Box)`
  color: ${(p) => p.theme.palette.primary.dark};

  &:hover {
    color: ${(p) => p.theme.palette.primary.main};
  }
`;

export const ActiveText = styled(Box)`
  color: ${(p) => p.theme.palette.primary.main};
`;
