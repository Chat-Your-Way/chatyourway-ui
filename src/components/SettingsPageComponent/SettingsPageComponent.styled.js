import styled from '@emotion/styled';
import { Box, InputBase, List, Typography, ListItem } from '@mui/material';
import { ICONS } from '../../ui-kit/icons';
import IconButton from '../../ui-kit/components/IconButton/IconButton';

export const SettingsPageWrap = styled(Box)`
  /* display: flex;
  flex-direction: column;
  gap: 16px; */
  height: 71vh;
  width: 87vw;
  padding: 12px 6px;
  background-color: ${(p) => p.theme.palette.primary.white};
  /* max-height: 70vh; */
  /* overflow-y: auto; */
  /* max-width: 342px; */
  border-radius: 16px;

  @media screen and (min-width: 768px) {
    /* height: 840px; */
    width: 75vw;
    height: 75vh;
    /* margin-left: 30px; */ // If this value for correct render text in SideBar?
    padding: 40px 24px;
  }

  @media screen and (min-width: 1200px) {
    /* height: 760px; */
    width: 60vw;
    /* margin-left: 40px; */
    padding: 40px;
  }
`;

export const SettingsPageWrapAdd = styled.div`
  height: 85%;
  overflow-y: auto;
`;

export const SettingsPageMainTitle = styled(Typography)`
  margin-bottom: 16px;
  @media screen and (min-width: calc(845px - 0.02px)) {
    ${(p) => p.theme.typography.h2};
  }
  color: ${(p) => p.theme.palette.primary.dark};
`;

export const SettingsWrap = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SettingsLabel = styled(Typography)`
  /* @media screen and (min-width: 767px) {
    ${(p) => p.theme.typography.h4};
  } */
  color: ${(p) => p.theme.palette.primary.dark};
`;

export const SettingsIconButton = styled(IconButton)`
  padding: 8px;
`;

export const SettingsIcon = styled(ICONS.EDIT)`
  fill: ${(p) => p.theme.palette.primary.main};
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
