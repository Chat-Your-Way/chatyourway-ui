import styled from '@emotion/styled';
import { ICONS } from '../../../ui-kit/icons';

export const PasswordIconHide = styled(ICONS.HIDE)`
  fill: ${(p) => p.theme.palette.primary.black};
  cursor: pointer;
`;

export const PasswordIconShow = styled(ICONS.SHOW)`
  fill: ${(p) => p.theme.palette.primary.black};
  cursor: pointer;
`;
