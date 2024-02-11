import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const LoaderWrap = styled(Box)`
  position: fixed;
  top: calc(50% - 48px);
  left: calc(50% - 48px);
  z-index: 1100;
`;
