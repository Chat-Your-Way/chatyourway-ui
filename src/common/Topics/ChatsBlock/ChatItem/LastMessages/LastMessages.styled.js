import styled from '@emotion/styled';
import { Badge, Typography, Box } from '@mui/material';

export const StyledBox = styled(Box, {
  shouldForwardProp: (p) => p !== 'isOpenChat' && p !== 'isOpenContacts',
})`
  padding: 4px 12px 8px;
  width: 271px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-sizing: border-box;

  @media screen and (min-width: calc(834px - 0.02px)) {
    width: 308px;
  }

  @media screen and (min-width: calc(1200px - 0.02px)) {
    width: ${(p) =>
      p.isOpenChat ? '300px' : p.isOpenContacts ? '241px' : '308px'};
  }
`;

export const StyledAuthorBlock = styled(Typography, {
  shouldForwardProp: (p) =>
    p !== 'isTyping' && p !== 'isOpenChat' && p !== 'isOpenContacts',
})`
  ${(p) => p.theme.typography.h6}
  width: 271px;
  color: ${(p) =>
    p.isTyping
      ? p.theme.palette.primary.green
      : p.theme.palette.primary.lightDisabled};

  @media screen and (min-width: calc(834px - 0.02px)) {
    ${(p) => p.theme.typography.h5}
    width: 308px;
  }

  @media screen and (min-width: calc(1200px - 0.02px)) {
    width: ${(p) =>
      p.isOpenChat ? '300px' : p.isOpenContacts ? '241px' : '308px'};
  }
`;

export const MessageCount = styled(Badge)`
  margin: 0 12px 0;
  width: 24px;
  color: ${(p) => p.theme.palette.primary.white};

  .MuiBadge-badge {
    background-color: ${(p) => p.theme.palette.primary.main};
  }
`;

export const StyledTimeText = styled(Typography)`
  position: absolute; //!+
  top: 16px; //!+
  right: 26px; //!+
  ${(p) => p.theme.typography.h6}
  color: ${(p) => p.theme.palette.primary.lightDisabled};

  @media screen and (min-width: calc(834px - 0.02px)) {
    ${(p) => p.theme.typography.h5}
  }
`; //!
