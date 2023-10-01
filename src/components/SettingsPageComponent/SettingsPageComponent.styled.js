import styled from '@emotion/styled';
import { Box, InputBase, List, Typography, ListItem } from '@mui/material';
import { ICONS } from '../../ui-kit/icons';
import IconButton from '../../ui-kit/components/IconButton/IconButton';
import DefaultButton from '../../ui-kit/components/Button';

export const SettingsPageWarp = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${(p) => p.theme.palette.primary.white};
  width: 100%;
  max-width: 342px;
  height: 100vh;
  padding: 12px 6px;

  @media screen and (min-width: calc(845px - 0.02px)) {
    height: 840px;
    max-width: 648px;
    margin-left: 30px;
    padding: 40px 24px;
  }

  @media screen and (min-width: calc(1440px - 0.02px)) {
    height: 760px;
    max-width: 840px;
    margin-left: 40px;
    padding: 40px;
  }
`;

export const SettingsPageMainTitle = styled(Typography)`
  @media screen and (max-width: calc(845px - 0.02px)) {
    ${(p) => p.theme.typography.h2};
  }
  color: ${(p) => p.theme.palette.primary.dark};
`;

export const SettingsWrap = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SettingsLabel = styled(Typography)`
  @media screen and (max-width: calc(845px - 0.02px)) {
    ${(p) => p.theme.typography.h5};
  }
  color: ${(p) => p.theme.palette.primary.dark};
`;

export const SettingsIconButton = styled(IconButton)`
  padding: 8px;
`;

export const SettingsIcon = styled(ICONS.EDIT)`
  fill: ${(p) => p.theme.palette.primary.main};
`;

export const NewSettingsWrap = styled(Box)`
  margin: 0 auto;
`;

export const ChangeInputStyled = styled(InputBase, {
  shouldForwardProp: (p) => p !== 'inputWidth' && p !== 'inputHeight',
})`
  padding: 12px;
  width: ${(p) => (p.inputWidth ? p.inputWidth : '300px')};
  height: ${(p) => (p.inputHeight ? p.inputHeight : '46px')};
  margin-bottom: 15px;

  @media screen and (min-width: calc(845px - 0.02px)) {
    width: ${(p) => (p.inputWidth ? p.inputWidth : '400px')};
  }
`;

export const SettingsIconEdit = styled(ICONS.EDIT)`
  fill: ${(p) => p.theme.palette.primary.black};
`;

export const SaveChangeButton = styled(DefaultButton)`
  display: block;
  margin: 0 auto;
  width: 180px;
  height: 40px;
  color: ${(p) => p.theme.palette.primary.dark};
`;

export const AvatarList = styled(List)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 0;
  margin-bottom: 8px;

  @media screen and (min-width: calc(845px - 0.02px)) {
    margin-bottom: 20px;
  }
`;

export const AvatarListItem = styled(ListItem)`
  padding: 0;
`;
