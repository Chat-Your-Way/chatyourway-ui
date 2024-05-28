import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const StyledBox = styled(Box, {
  shouldForwardProp: (p) =>
    p !== 'chatOpened' && p !== 'contactsOpened' && p !== 'isActive',
})`
  padding-top: 8px;
  display: flex;
  box-sizing: border-box;
  cursor: pointer;

  border-radius: 16px;
  background: ${(p) =>
    p.isActive ? p.theme.palette.primary.disabled : 'transparent'};
  margin-bottom: 15px;

  @media screen and (min-width: 769px) {
    width: 396px;
    padding-left: 8px;
    margin-bottom: 12px;
  }

  @media screen and (min-width: 1200px) {
    width: ${(p) =>
      p.chatOpened ? '368px' : p.contactsOpened ? '300px' : '396px'};
    padding-bottom: 15px;
    margin-bottom: 0;
  }
`;

export const StyledChildrenBox = styled(Box, {
  shouldForwardProp: (p) => p !== 'chatOpened' && p !== 'contactsOpened',
})`
  width: 271px;

  padding: 8px 0 11px 8px;
  display: flex;
  flex-grow: 1;

  flex-direction: column;
  box-sizing: border-box;

  @media screen and (min-width: 769px) {
    width: 308px;

    padding: 8px 12px;
  }

  @media screen and (min-width: 1200px) {
    width: ${(p) =>
      p.chatOpened ? '300px' : p.contactsOpened ? '241px' : '308px'};
  }
`;
