import styled from '@emotion/styled';
import { ICONS } from '../../ui-kit/icons';

export const OpenIcon = styled(ICONS.ARROW_DOWN2)`
  path {
    fill: ${(p) => p.theme.palette.primary.main};
  }
`;

export const CloseIcon = styled(ICONS.CLOSE_SQUARE)`
  path {
    fill: ${(p) => p.theme.palette.primary.main};
  }

  circle {
    stroke: ${(p) => p.theme.palette.primary.main};
  }
`;
