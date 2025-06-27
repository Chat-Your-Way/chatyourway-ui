/* eslint-disable prettier/prettier */
import styled from '@emotion/styled';
import { ICONS } from '../../../ui-kit/icons';
// eslint-disable-next-line no-unused-vars
import {
  MenuItem,
  ListItemText,
  MenuList,
  Stack,
  InputBase,
  Badge,
  ListItemIcon,
  Button,
} from '@mui/material';

export const IconOpenStyled = styled(ICONS.MORE_CIRCLE)`
  min-width: 40px;
  min-height: 40px;
  fill: ${p => p.theme.palette.primary.contrastText};
`;

export const IconCloseStyled = styled(ICONS.CLOSE_SQUARE)`
  min-width: 20px;
  min-height: 20px;
  opacity: 0.6;
  transition: all 0.2s ease;
  path {
    fill: ${p =>
      p.theme.palette.mode === 'light'
        ? p.theme.palette.primary.dark
        : p.theme.palette.primary.main};
  }
  circle {
    stroke: ${p =>
      p.theme.palette.mode === 'light'
        ? p.theme.palette.primary.dark
        : p.theme.palette.primary.main};
  }
  &:hover {
    opacity: 1;
  }
`;

export const IconDeleteStyled = styled(ICONS.DELETE)`
  min-width: 20px;
  min-height: 20px;
  opacity: 0.6;
  transition: all 0.2s ease;
  path {
    fill: ${p =>
      p.theme.palette.mode === 'light'
        ? p.theme.palette.primary.dark
        : p.theme.palette.primary.main};
  }
  circle {
    stroke: ${p =>
      p.theme.palette.mode === 'light'
        ? p.theme.palette.primary.dark
        : p.theme.palette.primary.main};
  }
  &:hover {
    opacity: 1;
  }
`;

export const BadgeStyled = styled(Badge)`
  color: ${p =>
    p.theme.palette.mode === 'light' ? p.theme.palette.primary.dark : p.theme.palette.primary.main};
`;

export const IconLeftArrowCircleStyled = styled(ICONS.ARROW_LEFT_C)`
  min-width: 20px;
  min-height: 20px;
  opacity: 0.6;
  transition: all 0.2s ease;
  path {
    fill: ${p =>
      p.theme.palette.mode === 'light'
        ? p.theme.palette.primary.dark
        : p.theme.palette.primary.main};
  }
  circle {
    stroke: ${p =>
      p.theme.palette.mode === 'light'
        ? p.theme.palette.primary.dark
        : p.theme.palette.primary.main};
  }
  &:hover {
    opacity: 1;
  }
`;

export const IconRightArrowCircleStyled = styled(ICONS.ARROW_RIGHT_C)`
  min-width: 20px;
  min-height: 20px;
  opacity: 0.6;
  transition: all 0.2s ease;
  path {
    fill: ${p =>
      p.theme.palette.mode === 'light'
        ? p.theme.palette.primary.dark
        : p.theme.palette.primary.main};
  }
  circle {
    stroke: ${p =>
      p.theme.palette.mode === 'light'
        ? p.theme.palette.primary.dark
        : p.theme.palette.primary.main};
  }
  &:hover {
    opacity: 1;
  }
`;

export const SettingsMenuStyledList = styled(MenuList)`
  box-sizing: border-box;
  width: 290px;
  padding: 12px;
  border-radius: 16px;
  background: ${p => p.theme.palette.primary.disabled} !important;
  box-shadow: 0px 2px 9px 4px rgba(102, 102, 146, 0.15);

  .MuiMenuItem-root {
    padding: 0;
  }
  .MuiList-padding {
    padding: 0;
  }
  .MuiMenu-list {
    @media screen and (min-width: 768px) {
      display: flex;
      flex-direction: column;
      gap: 7px;
      z-index: 1;
    }
  }
`;

export const SettingsItemStyled = styled(MenuItem)`
  position: relative;
`;

export const SettingsItemButton = styled(Button)`
  text-align: left;
  text-transform: none;
  color: ${p => p.theme.palette.primary.dark};
  transition: all 0.2s ease;
  &:hover {
    background-color: transparent;
    color: ${p =>
      p.theme.palette.mode === 'light'
        ? p.theme.palette.primary.contrastText
        : p.theme.palette.primary.main};
  }
`;

export const ListItemIconStyled = styled(ListItemIcon)`
  opacity: ${p =>
    p.complainIsLoading ||
    p.addFavouriteIsLoading ||
    p.removeFavouriteIsLoading ||
    p.unSubscribeTopicsIsLoading ||
    p.subscribeTopicsIsLoading
      ? 0.5
      : 1};
`;

export const SettingsTextStyled = styled(ListItemText)`
  opacity: ${p =>
    p.complainIsLoading ||
    p.addFavouriteIsLoading ||
    p.removeFavouriteIsLoading ||
    p.unSubscribeTopicsIsLoading ||
    p.subscribeTopicsIsLoading
      ? 0.5
      : 1};
  & > span {
    white-space: wrap;
    color: inherit;
    ${p => p.theme.typography.h5}
    @media screen and (min-width: calc(845px - 0.02px)) {
      width: 210px;
    }
  }
`;

export const SearchInputStack = styled(Stack)`
  /* flex-direction: 'row';
  justify-content: 'center';
  align-items: 'center'; */
  /* padding: '12px';
  border-radius: '16px'; */
  background: ${p => p.theme.palette.primary.disabled} !important;
  box-shadow: 0px 2px 9px 4px rgba(102, 102, 146, 0.15);
`;

export const SearchInputOwn = styled(InputBase, {
  shouldForwardProp: p => p !== 'inputWidth' && p !== 'inputHeight',
})`
  width: 100%;
  height: ${p => (p.inputHeight ? p.inputHeight : '42px')};
  padding: ${p => (p.inputPadding ? p.inputPadding : '8px 0 8px 12px')};
  opacity: 1;

  @media screen and (min-width: 768px) {
    width: ${p => (p.inputWidth ? p.inputWidth : '400px')};
  }
`;

export const MenuIconSearch = styled(ICONS.SEARCH)`
  min-width: 20px;
  min-height: 20px;
  stroke: ${p =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.contrastText
      : p.theme.palette.primary.main};
`;

export const MenuIconHeart = styled(ICONS.HEART)`
  opacity: ${p => (p.addFavouriteIsLoading || p.removeFavouriteIsLoading ? 0.5 : 1)};
  min-width: 20px;
  min-height: 20px;
  fill: ${p =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.contrastText
      : p.theme.palette.primary.main};
`;

export const MenuIconComplain = styled(ICONS.DANGER_CIRCLE)`
  opacity: ${p => (p.complainIsLoading ? 0.5 : 1)};
  min-width: 20px;
  min-height: 20px;
  fill: ${p =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.contrastText
      : p.theme.palette.primary.main};
`;

export const MenuIconSubscribe = styled(ICONS.SUBSCRIBE)`
  opacity: ${p => (p.subscribeTopicIsLoading || p.unSubscribeTopicIsLoading ? 0.5 : 1)};
  min-width: 20px;
  min-height: 20px;
  fill: ${p =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.contrastText
      : p.theme.palette.primary.main};
`;
