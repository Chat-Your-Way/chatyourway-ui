import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const StyledBox = styled(Box, {
  shouldForwardProp: (p) =>
    p !== 'chatOpened' && p !== 'contactsOpened' && p !== 'isActive',
})`
  padding-top: 8px;
  padding-left: 8px;
  width: ${(p) =>
    p.chatOpened ? '368px' : p.contactsOpened ? '300px' : '396px'};

  display: flex;
  box-sizing: border-box;

  border-radius: 16px;
  background: ${(p) =>
    p.isActive ? p.theme.palette.primary.disabled : 'transparent'};
`;

export const StyledNavLink = styled(NavLink)`
  position: relative;

  text-decoration: none;
`;
