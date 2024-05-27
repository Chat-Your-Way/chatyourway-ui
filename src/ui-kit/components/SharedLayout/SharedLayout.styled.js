import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const MainWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  @media screen and (min-width: 769px) {
    gap: 24px;
    padding: 0 40px;
  }
  @media screen and (min-width: 1195px) {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
`;
