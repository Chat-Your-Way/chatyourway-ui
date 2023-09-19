import styled from '@emotion/styled';
import Button from '../../../ui-kit/components/Button';
import { ICONS } from '../../../ui-kit/icons';
import { Box } from '@mui/material';

export const FooterWrap = styled(Box)`
  padding: 40px 0;
`;

export const LogOutButton = styled(Button)`
  background-color: transparent;
  color: ${(p) => p.theme.palette.primary.dark};
`;

export const LogOutIcon = styled(ICONS.LOGOUT)`
  transform: rotate(180deg);
  fill: ${(p) => p.theme.palette.primary.dark};
`;
