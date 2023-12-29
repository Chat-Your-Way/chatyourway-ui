import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const TextNavLinkButtonStyled = styled(NavLink, {
  shouldForwardProp: (p) =>
    p !== 'withoutBackground' &&
    p !== 'filled' &&
    p !== 'endIcon' &&
    p !== 'iconWidth' &&
    p !== 'startIcon' &&
    p !== 'iconHeight',
})`
  ${(p) => p.theme.typography.h5};
  padding: 8px 12px;
  text-transform: none;
  text-decoration: none;
  border-radius: 8px;
  border: 1px solid ${(p) => p.theme.palette.primary.main};
  width: 180px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(p) => p.theme.palette.primary.dark};
  ${(p) => {
    return (
      p.withoutBackground &&
      `
      background: none;
      border: none;
      `
    );
  }}

  transition: 0.2s ease all;

  &:hover,
  &:focus-visible {
    padding: 8px 12px;
    background: rgba(134, 134, 220, 0.8);
    box-shadow: 0px 1px 8px 4px rgba(134, 134, 220, 0.2);
    border: 1px solid transparent;
  }

  &:active {
    box-shadow: none;
    background-color: ${(p) => p.theme.palette.primary.main};
    border: 1px solid ${(p) => p.theme.palette.primary.contrastText};
  }

  .MuiButton-startIcon {
    margin-left: 0;
    margin-right: 8px;
  }

  .MuiButton-endIcon {
    margin-left: 8px;
    margin-right: 0;
  }

  .MuiButton-endIcon svg,
  .MuiButton-startIcon svg {
    width: ${(p) => p.iconWidth};
    height: ${(p) => p.iconHeight};
  }

  ${(p) => {
    return (
      p.disabled &&
      `
      opacity: 0.9;
      color: ${p.theme.palette.primary.dark};
      background-color: ${p.theme.palette.primary.disabled};
      border: 1px solid ${p.theme.palette.primary.light};
      `
    );
  }}
`;
