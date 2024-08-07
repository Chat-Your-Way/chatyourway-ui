import styled from '@emotion/styled';
import { Typography, Box } from '@mui/material';

export const StyledBox = styled(Box, {
  shouldForwardProp: (p) => p !== 'chatOpened' && p !== 'contactsOpened',
})`
  margin-bottom: 6px;
  width: 271px;
  width: 100%;
  max-width: 225px;

  display: flex;
  justify-content: space-between;
  box-sizing: border-box;

  @media screen and (min-width: 769px) {
    width: 308px;
    width: 100%;
    margin-bottom: 10px;
  }

  @media screen and (min-width: 1200px) {
    width: ${(p) =>
      p.chatOpened ? '300px' : p.contactsOpened ? '241px' : '308px'};
    width: 100%;
    margin-bottom: 6px;
  }
`;

export const StyledThemeText = styled(Typography)`
  width: 100%;
  ${(p) => p.theme.typography.h6}
  color: ${(p) => p.theme.palette.primary.dark};

  @media screen and (min-width: 769px) {
    ${(p) => p.theme.typography.h5}
  }
`;
