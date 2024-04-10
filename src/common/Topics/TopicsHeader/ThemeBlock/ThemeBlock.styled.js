import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const StyledBox = styled(Box, {
  shouldForwardProp: (p) => p !== 'isOpenChat' && p !== 'isOpenContacts',
})`
  ${(p) => p.theme.typography.h1};
  width: 330px;
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

  @media screen and (min-width: calc(834px - 0.02px)) {
    width: 400px;
    height: 65px;
  }

  @media screen and (min-width: calc(1200px - 0.02px)) {
    width: ${(p) =>
      p.isOpenChat ? '360px' : p.isOpenContacts ? '300px' : '400px'};
  }
`;
