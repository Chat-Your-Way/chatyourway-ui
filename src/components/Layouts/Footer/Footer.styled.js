import styled from '@emotion/styled';
import Button from '../../../ui-kit/components/Button';
import { ICONS } from '../../../ui-kit/icons';
import { Box } from '@mui/material';

export const FooterWrap = styled(Box)`
  display: none;

  @media screen and (min-width: calc(845px - 0.02px)) {
    display: block;
    padding-top: 77px;
    padding-bottom: 40px;
  }
  @media screen and (min-width: calc(1195px - 0.02px)) {
    padding-top: 24px;
    padding-bottom: 40px;
  }
`;

export const LogOutButton = styled(Button)`
  ${(p) => p.theme.typography.h4};
  text-transform: uppercase;
  background-color: transparent;
  color: ${(p) => p.theme.palette.primary.dark};
`;

export const LogOutIcon = styled(ICONS.LOGOUT)`
  transform: rotate(180deg);
  fill: ${(p) => p.theme.palette.primary.dark};
`;
