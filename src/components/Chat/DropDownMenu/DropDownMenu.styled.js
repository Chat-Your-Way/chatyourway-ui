import styled from '@emotion/styled';
import { ICONS } from '../../../ui-kit/icons';
import { Menu, MenuItem, ListItemText, Box } from '@mui/material';
import IconButton from '../../../ui-kit/components/IconButton/IconButton';

export const StyledButtonMore = styled(IconButton)`
  &:hover {
    & > svg {
      fill: ${(p) => p.theme.palette.primary.main};
      path: ${(p) => p.theme.palette.primary.main};
    }
  }
`;

export const StyledMenu = styled(Menu)`
  .MuiMenu-paper {
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

export const MenuItemBox = styled(Box)`
  display: flex;
  gap: 8px;
`;

export const StyledListItem = styled(MenuItem)`
  transition: all 0.2s ease;
`;

export const StyledListItemText = styled(ListItemText)`
  & > span {
    color: ${(p) => p.theme.palette.primary.dark};
    ${(p) => p.theme.typography.h6}
    @media screen and (min-width: calc(845px - 0.02px)) {
      ${(p) => p.theme.typography.h5};
    }
  }
`;

export const IconMoreChat = styled(ICONS.MORE_CIRCLE)`
  min-width: 20px;
  min-height: 20px;
  fill: ${(p) => p.theme.palette.primary.lightDisabled};
  transition: all 0.2s ease;
`;

export const CloseMenu = styled(ICONS.CLOSE_SQUARE)`
  min-width: 20px;
  min-height: 20px;
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
`;

export const MenuIconSend = styled(ICONS.SEND)`
  min-width: 20px;
  min-height: 20px;
  fill: ${(p) => p.theme.palette.primary.contrastText};
`;

export const MenuIconComplain = styled(ICONS.DANGER_CIRCLE)`
  min-width: 20px;
  min-height: 20px;
  fill: ${(p) => p.theme.palette.primary.contrastText};
`;
