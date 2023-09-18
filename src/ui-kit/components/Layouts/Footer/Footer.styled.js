import styled from '@emotion/styled';
import Button from '../../Button';
import { ICONS } from '../../../icons';

export const StyledFooter = styled.footer`
  background-color: transparent;
`;

export const LogOutButton = styled(Button)`
  background-color: transparent;
  color: ${(p) => p.theme.palette.primary.dark};
`;

export const LogOutIcon = styled(ICONS.LOGOUT)`
  transform: rotate(180deg);
  fill: ${(p) => p.theme.palette.primary.dark};
`;
