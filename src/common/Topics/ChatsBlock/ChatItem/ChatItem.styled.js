import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const StyledBox = styled(Box, {
  shouldForwardProp: (p) =>
    p !== 'isOpenChat' && p !== 'isOpenContacts' && p !== 'isActive',
})`
  padding-top: 8px;
  padding-left: 8px;
  width: 330px;
  display: flex;
  box-sizing: border-box;
  cursor: pointer;

  border-radius: 16px;
  background: ${(p) =>
    p.isActive ? p.theme.palette.primary.disabled : 'transparent'};

  @media screen and (min-width: calc(834px - 0.02px)) {
    width: 396px;
  }

  @media screen and (min-width: calc(1200px - 0.02px)) {
    width: ${(p) =>
      p.isOpenChat ? '368px' : p.isOpenContacts ? '300px' : '396px'};
  }
`;

export const StyledChildrenBox = styled(Box, {
  shouldForwardProp: (p) => p !== 'isOpenChat' && p !== 'isOpenContacts',
})`
  width: 271px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media screen and (min-width: calc(834px - 0.02px)) {
    width: 308px;
  }

  @media screen and (min-width: calc(1200px - 0.02px)) {
    width: ${(p) =>
      p.isOpenChat ? '300px' : p.isOpenContacts ? '241px' : '308px'};
  }
`;
