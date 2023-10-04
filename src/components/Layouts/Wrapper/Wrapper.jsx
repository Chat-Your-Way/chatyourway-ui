import styled from '@emotion/styled';
import { Box } from '@mui/material';

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @media (max-width: 390px) {
    margin: 0 24px;
  }

  @media (min-width: 391px) and (max-width: 833px) {
    margin: 0 40px;
  }

  @media (min-width: 834px) {
    margin: 0 80px;
  }
`;

export default Wrapper;
