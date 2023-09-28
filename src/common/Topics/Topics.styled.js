import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const StyledBox = styled(Box, {
  shouldForwardProp: (p) => p !== 'isOpenChat' && p !== 'isOpenContacts',
})`
  padding-top: ${(p) =>
    p.isOpenChat ? '8px' : p.isOpenContacts ? '8px' : '0'};
  padding-left: ${(p) =>
    p.isOpenChat ? '18px' : p.isOpenContacts ? '5px' : '18px'};
  padding-right: ${(p) =>
    p.isOpenChat ? '14px' : p.isOpenContacts ? '5px' : '18px'};
  padding-bottom: 58px;
  width: ${(p) =>
    p.isOpenChat ? '400px' : p.isOpenContacts ? '310px' : '440px'};
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-sizing: border-box;
  background-color: ${(p) => p.theme.palette.primary.white};
  border-radius: 16px;
`;
