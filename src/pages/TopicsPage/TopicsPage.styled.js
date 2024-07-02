import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const StyledBox = styled(Box)`
  /* display: flex; */
  /* gap: 35px; */
  /* flex-grow: 1; */
  /* margin-top: 85px; */
  /* position: absolute; */

  @media screen and (max-width: 400px) {
    /* margin-top: 40px; */
  }

  @media screen and (min-width: 768px) {
    /* margin-top: -30px; */
    /* margin-right: 102px; */
    /* position: inherit; */
  }

  @media screen and (min-width: 1200px) {
    display: flex;
    gap: 40px;
    flex-grow: 2;
    /* margin-top: 30px; */
    margin-right: 0;
  }
`;
