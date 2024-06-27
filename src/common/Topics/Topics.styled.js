import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const TopicsWrapper = styled(Box, {
  shouldForwardProp: (p) => p !== 'chatOpened' && p !== 'contactsOpened',
})`
  padding: 10px 10px 6px 10px;

  // height: calc(100vh - 145px); // Old rule
  height: 85vh;
  // width: calc(100vw - 40px); // Old rule
  width: 93vw;
  overflow-y: auto;

  // display: flex; // Old rule
  // flex-direction: column; // Old rule

  box-sizing: border-box;
  background-color: ${(p) => p.theme.palette.primary.white};
  border-radius: 16px;

  @media screen and (min-width: 768px) {
    padding: 11px 26px 6px 11px;
    width: 440px;
    // height: calc(100vh - 305px); // Old code
    height: 70vh;
  }

  @media screen and (min-width: 768px) and (max-width: 800px) {
    margin-left: 50px;
  }

  @media screen and (min-width: 1200px) {
    // height: calc(100vh - 263px); // Old code
    height: 75vh;

    padding-top: ${(p) =>
      p.chatOpened ? '8px' : p.contactsOpened ? '8px' : '1px'};
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
