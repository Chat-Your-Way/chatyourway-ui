import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const StyledBox = styled(Box, {
  shouldForwardProp: (p) => p !== 'chatOpened' && p !== 'contactsOpened',
})`
  font-size: 40px;
  //width: 342px;

  height: 54px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  color: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.dark
      : p.theme.palette.primary.contrastText};

  path {
    fill: ${(p) =>
      p.theme.palette.mode === 'dark'
        ? p.theme.palette.primary.disabled
        : p.theme.palette.primary.dark};
    fill: ${(p) => p.theme.palette.primary.dark};
  }

  @media screen and (min-width: 769px) {
    ${(p) => p.theme.typography.h1};
    //width: 400px;
    width: 100%;

    height: 65px;
  }

  @media screen and (min-width: 1200px) {
    width: ${(p) =>
      p.chatOpened ? '360px' : p.contactsOpened ? '300px' : '100%'};
    height: 60px;
  }
`;
