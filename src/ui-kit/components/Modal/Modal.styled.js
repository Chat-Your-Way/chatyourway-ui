import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const StyledBackdropBox = styled(Box, {
  shouldForwardProp: (p) => p !== 'location',
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(98, 97, 175, 0.6);
  display: flex;
  // justify-content: center;
  justify-content: ${(p) =>
    p.location === 'left'
      ? 'start'
      : p.location === 'right'
      ? 'end'
      : 'center'};
  align-items: center;

  z-index: 999;
`;
