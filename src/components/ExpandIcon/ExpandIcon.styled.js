import styled from '@emotion/styled';
import { ICONS } from '../../ui-kit/icons';
import { Box } from '@mui/material';

export const IconWrapper = styled(Box)`
  .expandIconWrapper {
    display: none;
  }

  .Mui-expanded & > .collapsIconWrapper {
    display: none;
  }

  .Mui-expanded & > .expandIconWrapper {
    display: block;
  }

  path {
    fill: ${(p) => p.theme.palette.primary.contrastText};
  }

  circle {
    stroke: ${(p) => p.theme.palette.primary.contrastText};
  }
`;

export const OpenIcon = styled(ICONS.ARROW_DOWN2)``;

export const CloseIcon = styled(ICONS.CLOSE_SQUARE)`
  transition: scale 0.2s ease;
  &:hover {
    scale: 1.1;
  }
`;
