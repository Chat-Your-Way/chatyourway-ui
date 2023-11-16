import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const MainWrapper = styled(Box)`
  display: flex;
  padding: 0 24px;

  @media screen and (min-width: calc(845px - 0.02px)) {
    gap: 24px;
    padding: 0 40px;
  }
  @media screen and (min-width: calc(1195px - 0.02px)) {
    padding: 0 80px;
    gap: 40px;
  }
`;
