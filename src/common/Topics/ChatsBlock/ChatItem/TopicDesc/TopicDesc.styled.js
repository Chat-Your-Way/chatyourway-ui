import styled from '@emotion/styled';
import { Typography, Box } from '@mui/material';

export const StyledBox = styled(Box, {
  shouldForwardProp: (p) => p !== 'isOpenChat' && p !== 'isOpenContacts',
})`
  padding: 8px 12px 4px;
  width: 271px;
  display: flex;
  gap: 8px;
  justify-content: space-between;
  box-sizing: border-box;

  @media screen and (min-width: calc(834px - 0.02px)) {
    width: 308px;
  }

  @media screen and (min-width: calc(1200px - 0.02px)) {
    width: ${(p) =>
      p.isOpenChat ? '300px' : p.isOpenContacts ? '241px' : '308px'};
  }
`;

export const StyledThemeText = styled(Typography)`
  ${(p) => p.theme.typography.h6}
  color: ${(p) => p.theme.palette.primary.dark};

  @media screen and (min-width: calc(834px - 0.02px)) {
    ${(p) => p.theme.typography.h5}
  }
`;

export const StyledTimeText = styled(Typography)`
  ${(p) => p.theme.typography.h6}
  color: ${(p) => p.theme.palette.primary.lightDisabled};

  @media screen and (min-width: calc(834px - 0.02px)) {
    ${(p) => p.theme.typography.h5}
  }
`;
