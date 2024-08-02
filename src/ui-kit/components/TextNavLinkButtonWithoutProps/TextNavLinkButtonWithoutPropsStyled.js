import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const TextNavLinkButtonStyledWithoutProps = styled(NavLink, {
  shouldForwardProp: (p) =>
    p !== 'withoutBackground' && p !== 'iconWidth' && p !== 'iconHeight',
})`
  ${(p) => p.theme.typography.h5};
  padding: 8px 12px;
  text-transform: none;
  text-decoration: none;
  border-radius: 8px;
  border: 1px solid transparent;
  color: ${(p) => p.theme.palette.primary.dark};
  background: ${(p) =>
    p.withoutBackground ? `none` : p.theme.palette.primary.light};
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
    background: ${(p) => p.theme.palette.primary.main};
    border: 1px solid ${(p) => p.theme.palette.primary.contrastText};
  }

  &:disabled {
    border: 1px solid ${(p) => p.theme.palette.primary.light};
    background: ${(p) => p.theme.palette.primary.disabled};
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
`;
