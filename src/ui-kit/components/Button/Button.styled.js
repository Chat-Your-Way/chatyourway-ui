import { css } from '@emotion/react';
import lightTheme from '../../theme/theme';

export const buttonCss = css`
  padding: 8px 12px;
  text-transform: none;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid transparent;
  color: ${lightTheme.palette.primary.dark};
  background: ${lightTheme.palette.primary.light};
  transition: 0.2s ease all;

  &:hover,
  &:focus-visible {
    padding: 8px 12px;
    background: ${lightTheme.palette.primary.light};
    box-shadow: 0px 1px 8px 4px rgba(134, 134, 220, 0.2);
    border: 1px solid transparent;
  }

  &:active {
    box-shadow: none;
    background: ${lightTheme.palette.primary.main};
    border: 1px solid ${lightTheme.palette.primary.contrastText};
  }

  &:disabled {
    background: #eeefff;
  }
`;

export const iconButtonCss = css`
  fill: ${lightTheme.palette.primary.dark};
  background: none;

  &:hover,
  &:focus-visible {
    background: none;
  }

  &:active {
    fill: ${lightTheme.palette.primary.contrastText};
    background: none;
  }
`;
