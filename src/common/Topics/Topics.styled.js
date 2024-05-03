import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const StyledBox = styled(Box, {
  shouldForwardProp: (p) => p !== 'chatOpened' && p !== 'contactsOpened',
})`
  padding-top: 6px;
  padding-left: 6px;
  padding-right: 6px;
  padding-bottom: 10px;

  height: calc(100vh - 120px);
  overflow-y: auto;

  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  background-color: ${(p) => p.theme.palette.primary.white};
  border-radius: 16px;

  @media screen and (min-width: calc(834px - 0.02px)) {
    padding-top: 8px;
    padding-left: 18px;
    padding-right: 22px;
    padding-bottom: 8px;
    width: 440px;
    height: calc(100vh - 366px);
  }

  @media screen and (min-width: calc(1200px - 0.02px)) {
    height: calc(100vh - 273px);

    padding-top: ${(p) =>
      p.chatOpened ? '8px' : p.contactsOpened ? '8px' : '0'};
    padding-left: ${(p) =>
      p.chatOpened ? '18px' : p.contactsOpened ? '5px' : '18px'};
    padding-right: ${(p) =>
      p.chatOpened ? '14px' : p.contactsOpened ? '5px' : '18px'};
    padding-bottom: 58px;
    width: ${(p) =>
      p.chatOpened ? '400px' : p.contactsOpened ? '310px' : '440px'};
  }
`;
