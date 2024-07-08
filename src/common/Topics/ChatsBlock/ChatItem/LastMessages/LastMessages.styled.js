import styled from '@emotion/styled';
import { Badge, Typography, Box } from '@mui/material';

export const StyledBox = styled(Box, {
  shouldForwardProp: (p) => p !== 'chatOpened' && p !== 'contactsOpened',
})`
  width: 271px;
  width: 100%;

  display: flex;
  align-items: center;
  gap: 16px;
  box-sizing: border-box;

  @media screen and (min-width: 769px) {
    width: 308px;
    width: 100%;
  }

  @media screen and (min-width: 1200px) {
    width: ${(p) =>
      p.chatOpened ? '300px' : p.contactsOpened ? '241px' : '100%'};
    width: 100%;
  }
`;

export const StyledAuthorBlock = styled(Typography, {
  shouldForwardProp: (p) =>
    p !== 'isTyping' && p !== 'chatOpened' && p !== 'contactsOpened',
})`
  ${(p) => p.theme.typography.h6}
  width: 271px;
  width: 100%;
  color: ${(p) =>
    p.isTyping
      ? p.theme.palette.primary.green
      : p.theme.palette.primary.lightDisabled};

  @media screen and (min-width: 769px) {
    ${(p) => p.theme.typography.h5}
    // width: 308px;
    width: 100%;
  }

  @media screen and (min-width: 1200px) {
    // width: ${(p) =>
      p.chatOpened ? '300px' : p.contactsOpened ? '241px' : '100%'};
    // width: 100%;
  }
`;

export const MessageCount = styled(Badge)`
  margin: 30px 12px 0;
  width: 24px;
  color: ${(p) => p.theme.palette.primary.white};

  .MuiBadge-badge {
    background-color: ${(p) => p.theme.palette.primary.main};
  }
`;

export const StyledTimeText = styled(Typography)`
  position: absolute;
  top: 16px;
  right: 0;
  ${(p) => p.theme.typography.h6}
  color: ${(p) => p.theme.palette.primary.lightDisabled};

  @media screen and (min-width: 769px) {
    right: 16px;
    ${(p) => p.theme.typography.h5}
  }

  @media screen and (min-width: 1200px) {
    right: 20px;
  }
`;
