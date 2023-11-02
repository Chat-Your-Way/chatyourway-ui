import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export const StyledBox = styled(Box, {
  shouldForwardProp: (p) => p !== 'isOpenChat' && p !== 'isOpenContacts',
})`
  width: 330px;
  height: 43px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  border: 1px solid ${(p) => p.theme.palette.primary.contrastText};
  border-radius: 8px;

  @media screen and (min-width: calc(834px - 0.02px)) {
    width: 400px;
  }

  @media screen and (min-width: calc(1200px - 0.02px)) {
    width: ${(p) =>
      p.isOpenChat ? '360px' : p.isOpenContacts ? '300px' : '400px'};
  }
`;

export const StyledTabs = styled(Tabs, {
  shouldForwardProp: (p) => p !== 'isOpenChat' && p !== 'isOpenContacts',
})`
  width: 330px;
  min-height: 41px;
  display: flex;
  box-sizing: border-box;

  .MuiTabs-flexContainer {
    justify-content: space-between;
  }

  @media screen and (min-width: calc(834px - 0.02px)) {
    width: 400px;
  }

  @media screen and (min-width: calc(1200px - 0.02px)) {
    width: ${(p) =>
      p.isOpenChat ? '360px' : p.isOpenContacts ? '300px' : '400px'};
  }
`;

export const StyledTab = styled(Tab, {
  shouldForwardProp: (p) =>
    p !== 'tabWith' &&
    p !== 'firstTabPaddingX' &&
    p !== 'isActive' &&
    p !== 'borderRight' &&
    p !== 'borderLeft' &&
    p !== 'tabNumber',
})`
  ${(p) => p.theme.typography.h5};
  text-transform: lowercase;
  border-right: 1px solid ${(p) => p.theme.palette.primary.contrastText};
  width: ${(p) =>
    p.tabNumber == 1 ? '81px' : p.tabNumber == 2 ? '113px' : '127px'};
  min-height: 41px;
  padding: ${(p) => (p.firstTabPaddingX ? '10px 16px' : '10px')};
  box-sizing: border-box;
  background: ${(p) =>
    p.isActive ? p.theme.palette.primary.disabled : 'transparent'};
  border-radius: ${(p) =>
    p.borderRight ? '8px 0 0 8px' : p.borderLeft ? '0 8px 8px 0' : 'none'};

  @media screen and (min-width: calc(834px - 0.02px)) {
    width: ${(p) => p.tabWith};
  }

  @media screen and (min-width: calc(1200px - 0.02px)) {
    width: ${(p) => p.tabWith};
  }
`;
