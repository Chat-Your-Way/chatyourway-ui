import styled from '@emotion/styled';
import { ICONS } from '../../../ui-kit/icons';
import { Menu, MenuItem, ListItemText } from '@mui/material';

export const IconOpenStyled = styled(ICONS.MORE_CIRCLE)`
  min-width: 40px;
  min-height: 40px;
  fill: ${(p) => p.theme.palette.primary.contrastText};
`;

export const IconCloseStyled = styled(ICONS.CLOSE_SQUARE)`
  min-width: 20px;
  min-height: 20px;
  opacity: 0.6;
  transition: all 0.2s ease;
  path {
    fill: ${(p) =>
      p.theme.palette.mode === 'light'
        ? p.theme.palette.primary.dark
        : p.theme.palette.primary.main};
  }
  circle {
    stroke: ${(p) =>
      p.theme.palette.mode === 'light'
        ? p.theme.palette.primary.dark
        : p.theme.palette.primary.main};
  }
  &:hover {
    opacity: 1;
  }
`;

export const SettingsMenuStyled = styled(Menu)`
  .MuiMenu-paper {
    box-sizing: border-box;
    display: inline-flex;
    padding: 12px;
    align-items: flex-start;
    border-radius: 16px;
    background: ${(p) => p.theme.palette.primary.disabled} !important;
    box-shadow: 0px 2px 9px 4px rgba(102, 102, 146, 0.15);
  }
  .MuiMenuItem-root {
    padding: 0;
  }
  .MuiList-padding {
    padding: 0;
  }
  .MuiMenu-list {
    @media screen and (min-width: calc(845px - 0.02px)) {
      display: flex;
      flex-direction: column;
      gap: 7px;
    }
  }
`;

export const SettingsItemStyled = styled(MenuItem)`
  color: ${(p) => p.theme.palette.primary.dark};
  transition: all 0.2s ease;
  &:hover {
    background-color: transparent;
    color: ${(p) =>
      p.theme.palette.mode === 'light'
        ? p.theme.palette.primary.contrastText
        : p.theme.palette.primary.main};
  }
`;

export const SettingsTextStyled = styled(ListItemText)`
  & > span {
    width: 113px;
    white-space: wrap;
    color: inherit;
    ${(p) => p.theme.typography.h5}
    @media screen and (min-width: calc(845px - 0.02px)) {
      width: 210px;
    }
  }
`;

export const MenuIconSearch = styled(ICONS.SEARCH)`
  min-width: 20px;
  min-height: 20px;
  stroke: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.contrastText
      : p.theme.palette.primary.main};
`;

export const MenuIconHeart = styled(ICONS.HEART)`
  min-width: 20px;
  min-height: 20px;
  fill: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.contrastText
      : p.theme.palette.primary.main};
`;

export const MenuIconComplain = styled(ICONS.DANGER_CIRCLE)`
  min-width: 20px;
  min-height: 20px;
  fill: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.contrastText
      : p.theme.palette.primary.main};
`;
