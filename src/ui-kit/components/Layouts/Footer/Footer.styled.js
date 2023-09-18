import styled from '@emotion/styled';
import Button from '../../Button';
import { ICONS } from '../../../icons';

export const StyledFooter = styled.footer`
  background-color: transparent;
`;

export const LogOutButton = styled(Button)`
  background-color: transparent;
  color: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.dark
      : p.theme.palette.primary.disabled};
`;

export const LogOutIcon = styled(ICONS.LOGOUT)`
  transform: rotate(180deg);
  fill: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.dark
      : p.theme.palette.primary.disabled};
`;
