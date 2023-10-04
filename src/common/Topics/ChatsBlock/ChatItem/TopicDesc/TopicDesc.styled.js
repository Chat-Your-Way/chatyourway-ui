import styled from '@emotion/styled';
import { Typography, Box } from '@mui/material';

export const StyledBox = styled(Box, {
  shouldForwardProp: (p) => p !== 'isOpenChat' && p !== 'isOpenContacts',
})`
  padding: 8px 12px 4px;
  width: ${(p) =>
    p.isOpenChat ? '300px' : p.isOpenContacts ? '241px' : '308px'};
  display: flex;
  gap: 8px;
  justify-content: space-between;
  box-sizing: border-box;
`;

export const StyledThemeText = styled(Typography)`
  ${(p) => p.theme.typography.h5}
  color: ${(p) => p.theme.palette.primary.dark};
`;

export const StyledTimeText = styled(Typography)`
  ${(p) => p.theme.typography.h5}
  color: ${(p) => p.theme.palette.primary.lightDisabled};
`;
