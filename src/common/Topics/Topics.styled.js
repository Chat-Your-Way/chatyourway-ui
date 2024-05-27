import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const StyledBox = styled(Box, {
  shouldForwardProp: (p) => p !== 'chatOpened' && p !== 'contactsOpened',
})`
  padding: 10px 10px 6px 10px;

  height: calc(100vh - 145px);
  width: calc(100vw - 40px);
  overflow-y: auto;

  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  background-color: ${(p) => p.theme.palette.primary.white};
  border-radius: 16px;

  @media screen and (min-width: 769px) {
    padding: 11px 26px 6px 11px;
    width: 440px;
    height: calc(100vh - 355px);
  }

  @media screen and (min-width: 769px) and (max-width: 800px) {
    margin-left: 50px;
  }

  @media screen and (min-width: 1200px) {
    height: calc(100vh - 276px);

    padding-top: ${(p) =>
      p.chatOpened ? '8px' : p.contactsOpened ? '8px' : '-1px'};
    padding-left: ${(p) =>
      p.chatOpened ? '18px' : p.contactsOpened ? '5px' : '18px'};
    padding-right: ${(p) =>
      p.chatOpened ? '14px' : p.contactsOpened ? '5px' : '18px'};
    padding-bottom: 58px;
    width: ${(p) =>
      p.chatOpened ? '400px' : p.contactsOpened ? '310px' : '440px'};
    margin-left: 0;
  }

  .css-3iorhu-MuiTypography-root {
    @media screen and (max-width: 359px) {
      width: 85%;
    }
  }
`;
