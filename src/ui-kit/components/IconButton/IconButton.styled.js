import IconButton from '@mui/material/IconButton';
import styled from '@emotion/styled';

export const StyledIconButton = styled(IconButton)`
  padding-left: ${(p) => (p.pLeft ? p.pLeft : '3.13px')};
  padding-right: ${(p) => (p.pRight ? p.pRight : '4.71px')};
  padding-top: ${(p) => (p.pTop ? p.pTop : '3.13px')};
  padding-bottom: ${(p) => (p.pBottom ? p.pBottom : '4.71px')};
  stroke: ${(p) => (p.defaultStroke ? p.defaultStroke : 'none')};

  &:disabled {
    background: ${(p) => p.theme.palette.primary.disabled};
  }

  &:hover,
  &:focus-visible svg {
    background: none;
    filter: drop-shadow(-2px -2px 8px rgb(134 134 220 / 0.2))
      drop-shadow(2px 2px 8px rgb(134 134 220 / 0.2));
    stroke: ${(p) =>
      p.hoverStroke
        ? p.hoverStroke
        : p.defaultStroke
        ? p.defaultStroke
        : 'none'};
  }

  &:active {
    stroke: ${(p) => (p.activeStroke ? p.activeStroke : 'none')};
  }

  .MuiTouchRipple-ripple .MuiTouchRipple-child {
    background: none;
  }
`;
