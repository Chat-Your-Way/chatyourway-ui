import styled from '@emotion/styled';
import Button from '../../../ui-kit/components/Button';
import { ICONS } from '../../../ui-kit/icons';
import { Box } from '@mui/material';

export const FooterWrap = styled(Box)`
  z-index: 1;
  max-width: 1440px;
  width: 100%;
  /* position: absolute; */
  bottom: 0;
  display: none;
  padding-left: 80px;

  @media screen and (min-width: 768px) {
    display: block;
    padding: 77px 40px 40px 40px;
    /* padding-top: 77px;
    padding-bottom: 40px;
    padding-left: 40px; */
  }
  @media screen and (min-width: 1200px) {
    padding-top: 24px;
    padding-bottom: 40px;
    padding-left: 80px;
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
