import styled from '@emotion/styled';
import { Box, InputBase, List, Typography } from '@mui/material';
import { ICONS } from '../../ui-kit/icons';
import IconButton from '../../ui-kit/components/IconButton/IconButton';
import DefaultButton from '../../ui-kit/components/Button';

export const SettingsPageWarp = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${(p) => p.theme.palette.primary.white};
  height: 760px;
  width: 840px;
  margin: 0 55px;
  padding: 40px;
`;
export const SettingsPageMainTitle = styled(Typography)`
  text-transform: uppercase;
  color: ${(p) => p.theme.palette.primary.dark};
`;

export const SettingsWrap = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SettingsLabel = styled(Typography)`
  color: ${(p) => p.theme.palette.primary.dark};
`;

export const SettingsIconButton = styled(IconButton)`
  padding: 8px;
  margin-right: 16px;
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
  width: ${(p) => (p.inputWidth ? p.inputWidth : '400px')};
  height: ${(p) => (p.inputHeight ? p.inputHeight : '42px')};
  padding: 8px 12px 8px;
  margin-bottom: 15px;
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
  margin-bottom: 20px;
`;
