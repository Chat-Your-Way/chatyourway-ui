import styled from '@emotion/styled';
import { ICONS } from '../../../ui-kit/icons';

export const PasswordIconHide = styled(ICONS.HIDE)`
  fill: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.dark
      : p.theme.palette.primary.contrastText};
  cursor: pointer;
`;

export const PasswordIconShow = styled(ICONS.SHOW)`
  fill: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.dark
      : p.theme.palette.primary.contrastText};
  cursor: pointer;
`;
