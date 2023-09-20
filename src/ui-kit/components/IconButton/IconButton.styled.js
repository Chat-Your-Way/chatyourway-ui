import IconButton from '@mui/material/IconButton';
import styled from '@emotion/styled';

export const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (p) =>
    p !== 'pLeft' &&
    p !== 'pRight' &&
    p !== 'pTop' &&
    p !== 'pBottom' &&
    p !== 'editPath' &&
    p !== 'activeFill' &&
    p !== 'defaultFill' &&
    p !== 'hoverFill',
})`
  padding-left: ${(p) => (p.pLeft ? p.pLeft : '3.13px')};
  padding-right: ${(p) => (p.pRight ? p.pRight : '4.71px')};
  padding-top: ${(p) => (p.pTop ? p.pTop : '3.13px')};
  padding-bottom: ${(p) => (p.pBottom ? p.pBottom : '4.71px')};
  fill: ${(p) => (p.defaultFill && !p.editPath ? p.defaultFill : undefined)};
  path {
    fill: ${(p) => (p.defaultFill && p.editPath ? p.defaultFill : undefined)};
  }

  &:hover,
  &:focus-visible svg {
    background: none;
    filter: drop-shadow(-2px -2px 8px rgb(134 134 220 / 0.2))
      drop-shadow(2px 2px 8px rgb(134 134 220 / 0.2));

    fill: ${(p) =>
      p.hoverFill && !p.editPath
        ? p.hoverFill
        : p.defaultFill && !p.editPath
        ? p.defaultFill
        : undefined};

    path {
      fill: ${(p) =>
        p.hoverFill && p.editPath
          ? p.hoverFill
          : p.defaultFill && p.editPath
          ? p.defaultFill
          : undefined};
    }
  }

  &:active {
    fill: ${(p) =>
      p.activeFill && !p.editPath
        ? p.activeFill
        : p.defaultFill && !p.editPath
        ? p.defaultFill
        : undefined};

    path {
      fill: ${(p) =>
        p.activeFill && p.editPath
          ? p.activeFill
          : p.defaultFill && p.editPath
          ? p.defaultFill
          : undefined};
    }
  }

  &:disabled {
    background: ${(p) => p.theme.palette.primary.disabled};
  }

  .MuiTouchRipple-ripple .MuiTouchRipple-child {
    background: none;
  }
`;
