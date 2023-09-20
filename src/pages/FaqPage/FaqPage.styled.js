import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

export const FaqPageWrapper = styled(Box)`
  width: 840px;
  height: 760px;
  margin: 0 auto;
  padding: 40px 55px;
  border-radius: 16px;
  background-color: ${(p) => p.theme.palette.primary.white};
`;

export const FaqPageTitle = styled(Typography)`
  text-align: center;
  margin-bottom: 20px;
  color: ${(p) => p.theme.palette.primary.dark};
`;
