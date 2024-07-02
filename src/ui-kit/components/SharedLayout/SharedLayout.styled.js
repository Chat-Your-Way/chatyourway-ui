import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const MainWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  /* */
  /* min-height: 100vh; */
  min-height: 100%;

  @media screen and (min-width: 768px) {
    gap: 24px;
    padding: 0 40px;
  }
  @media screen and (min-width: 1200px) {
    /* display: flex;
    justify-content: center;
    align-items: center; */
    align-items: start;
    min-height: 100vh;
  }
`;
