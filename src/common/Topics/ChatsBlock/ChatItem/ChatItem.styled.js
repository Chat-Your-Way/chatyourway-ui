import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const StyledBox = styled(Box, {
  shouldForwardProp: (p) =>
    p !== 'isOpenChat' && p !== 'isOpenContacts' && p !== 'isActive',
})`
  padding-top: 8px;

  width: 330px;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  cursor: pointer;

  border-radius: 16px;
  background: ${(p) =>
    p.isActive ? p.theme.palette.primary.disabled : 'transparent'};

  @media screen and (min-width: calc(834px - 0.02px)) {
    width: 396px;
    width: 100%;
    padding-left: 8px;
  }

  @media screen and (min-width: calc(1200px - 0.02px)) {
    width: ${(p) =>
      p.isOpenChat ? '368px' : p.isOpenContacts ? '300px' : '396px'};
    width: 100%;
  }
`;

export const StyledChildrenBox = styled(Box, {
  shouldForwardProp: (p) => p !== 'isOpenChat' && p !== 'isOpenContacts',
})`
  width: 271px;
  width: 100%;

  padding: 8px 0 11px 8px;
  display: flex;
  flex-grow: 1;

  flex-direction: column;
  box-sizing: border-box;

  @media screen and (min-width: calc(834px - 0.02px)) {
    width: 308px;
    width: 100%;

    padding: 8px 12px;
  }

  @media screen and (min-width: calc(1200px - 0.02px)) {
    width: ${(p) =>
      p.isOpenChat ? '300px' : p.isOpenContacts ? '241px' : '308px'};
    width: 100%;
  }
`;
